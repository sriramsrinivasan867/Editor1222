import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Play } from "lucide-react";
import imageCompression from 'browser-image-compression';
import { removeBackground } from '@imgly/background-removal';
import { UploadSection } from './image-processor/UploadSection';
import { ResultSection } from './image-processor/ResultSection';

interface ProcessedImage {
  original: string;
  preview: string;
  processed: string | null;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retries: number;
}

// Processing settings
const SETTINGS = {
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.8,
    types: ['image/jpeg', 'image/png', 'image/webp']
  },
  processing: {
    model: "u2net",
    format: "image/png",
    quality: 0.9,
    maxRetries: 3,
    retryDelay: 1000,
    batchSize: 2
  }
};

export const ImageProcessor: React.FC = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const abortController = useRef<AbortController | null>(null);

  // Cleanup URLs
  const cleanup = useCallback((url: string | null) => {
    if (url?.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => {
        cleanup(img.original);
        cleanup(img.preview);
        cleanup(img.processed);
      });
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [cleanup, images]);

  // Process image with retries
  const processImage = useCallback(async (imageUrl: string, retryCount = 0): Promise<string> => {
    if (retryCount >= SETTINGS.processing.maxRetries) {
      throw new Error('Max retries exceeded');
    }

    try {
      // Cancel any ongoing request
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      // Get image data
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      // Process with background removal
      const result = await removeBackground(imageBlob, {
        model: SETTINGS.processing.model,
        progress: (p) => setProgress(Math.round(p * 100)),
        output: {
          format: SETTINGS.processing.format,
          quality: SETTINGS.processing.quality,
        }
      });

      // Create processed image URL
      return URL.createObjectURL(new Blob([result], { type: SETTINGS.processing.format }));

    } catch (error) {
      if (error.name === 'AbortError') {
        return imageUrl;
      }

      console.error('Processing error:', error);
      
      // Retry with backoff
      if (retryCount < SETTINGS.processing.maxRetries) {
        await new Promise(resolve => 
          setTimeout(resolve, SETTINGS.processing.retryDelay * Math.pow(2, retryCount))
        );
        return processImage(imageUrl, retryCount + 1);
      }
      
      throw error;
    }
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback(async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => 
      SETTINGS.upload.types.includes(file.type) && 
      file.size <= SETTINGS.upload.maxSize
    );

    if (validFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select valid image files under 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const newImages = await Promise.all(validFiles.map(async (file) => {
        // Create preview
        const preview = URL.createObjectURL(file);
        
        try {
          // Compress image
          const compressedFile = await imageCompression(file, {
            maxSizeMB: SETTINGS.upload.maxSize / (1024 * 1024),
            maxWidthOrHeight: Math.max(SETTINGS.upload.maxWidth, SETTINGS.upload.maxHeight),
            useWebWorker: true,
            fileType: file.type as any,
          });

          return {
            original: URL.createObjectURL(compressedFile),
            preview,
            processed: null,
            name: file.name,
            status: 'pending',
            retries: 0
          };
        } catch (error) {
          cleanup(preview);
          throw error;
        }
      }));

      setImages(prev => [...prev, ...newImages]);
      toast({ 
        title: "Upload successful", 
        description: `${newImages.length} images uploaded` 
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload images",
        variant: "destructive",
      });
    }
  }, [cleanup, toast]);

  // Handle single image processing
  const handleSingleProcess = useCallback(async () => {
    if (!images[currentImageIndex] || isProcessing) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const processedUrl = await processImage(images[currentImageIndex].original);
      
      setImages(prev => prev.map((img, idx) => {
        if (idx === currentImageIndex) {
          cleanup(img.processed);
          return { ...img, processed: processedUrl, status: 'completed' };
        }
        return img;
      }));

      toast({
        title: "Success",
        description: "Image processed successfully"
      });

    } catch (error) {
      console.error('Processing error:', error);
      setImages(prev => prev.map((img, idx) =>
        idx === currentImageIndex
          ? { ...img, status: 'failed' }
          : img
      ));
      
      toast({
        title: "Processing failed",
        description: "Failed to process image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [currentImageIndex, images, cleanup, processImage, toast]);

  // Handle bulk processing
  const handleBulkProcess = useCallback(async () => {
    if (isBulkProcessing) return;

    const pending = images.filter(img => !img.processed);
    if (pending.length === 0) return;

    setIsBulkProcessing(true);
    let processed = 0;

    try {
      // Process in batches
      for (let i = 0; i < pending.length; i += SETTINGS.processing.batchSize) {
        const batch = pending.slice(i, i + SETTINGS.processing.batchSize);
        
        await Promise.all(batch.map(async (img) => {
          const index = images.findIndex(x => x.original === img.original);
          if (index === -1) return;

          try {
            setImages(prev => prev.map((x, idx) =>
              idx === index ? { ...x, status: 'processing' } : x
            ));

            const processedUrl = await processImage(img.original);
            
            setImages(prev => prev.map((x, idx) => {
              if (idx === index) {
                cleanup(x.processed);
                return { ...x, processed: processedUrl, status: 'completed' };
              }
              return x;
            }));

            processed++;
            setProgress(Math.round((processed / pending.length) * 100));

          } catch (error) {
            console.error(`Failed to process ${img.name}:`, error);
            setImages(prev => prev.map((x, idx) =>
              idx === index ? { ...x, status: 'failed' } : x
            ));
          }
        }));
      }

      toast({
        title: "Bulk processing complete",
        description: `Processed ${processed} out of ${pending.length} images`,
      });

    } catch (error) {
      console.error('Bulk processing error:', error);
      toast({
        title: "Processing failed",
        description: "Some images failed to process",
        variant: "destructive",
      });
    } finally {
      setIsBulkProcessing(false);
      setProgress(0);
    }
  }, [images, cleanup, processImage, toast]);

  // Handle image deletion
  const handleDelete = useCallback(() => {
    if (!images[currentImageIndex]) return;

    setImages(prev => {
      const newImages = prev.filter((_, idx) => idx !== currentImageIndex);
      if (currentImageIndex >= newImages.length) {
        setCurrentImageIndex(Math.max(0, newImages.length - 1));
      }
      return newImages;
    });

    cleanup(images[currentImageIndex].original);
    cleanup(images[currentImageIndex].preview);
    cleanup(images[currentImageIndex].processed);

    toast({
      title: "Image deleted",
      description: "Image has been removed"
    });
  }, [currentImageIndex, images, cleanup, toast]);

  // Handle image download
  const handleDownload = useCallback(async () => {
    const currentImage = images[currentImageIndex];
    if (!currentImage?.processed) return;

    try {
      const response = await fetch(currentImage.processed);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentImage.name.replace(/\.[^/.]+$/, '')}_processed.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  }, [currentImageIndex, images, toast]);

  const currentImage = useMemo(() => 
    images[currentImageIndex] || null, 
    [images, currentImageIndex]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {images.length === 0 ? (
            <UploadSection 
              onUpload={handleImageUpload}
              onDrop={e => {
                e.preventDefault();
                handleImageUpload(e.dataTransfer.files);
              }}
              multiple={true}
            />
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Image Gallery</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentImageIndex === 0}
                    >
                      Previous
                    </Button>
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentImageIndex(prev => 
                        Math.min(images.length - 1, prev + 1)
                      )}
                      disabled={currentImageIndex === images.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative cursor-pointer rounded-lg overflow-hidden ${
                        idx === currentImageIndex ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-full h-16 object-cover"
                      />
                      {img.status === 'processing' && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <ResultSection
                originalImage={currentImage?.original || ''}
                previewImage={currentImage?.preview || ''}
                processedImage={currentImage?.processed}
                isProcessing={isProcessing || (currentImage?.status === 'processing')}
                progress={progress}
                onProcess={handleSingleProcess}
                onDelete={handleDelete}
                onDownload={handleDownload}
                totalImages={images.length}
                currentIndex={currentImageIndex}
                onNavigate={setCurrentImageIndex}
              />

              {images.some(img => !img.processed) && (
                <div className="mt-6 flex justify-center">
                  <Button
                    size="lg"
                    onClick={handleBulkProcess}
                    disabled={isBulkProcessing}
                    className="w-full sm:w-auto"
                  >
                    {isBulkProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Process All
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};