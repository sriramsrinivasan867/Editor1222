import { useState, useCallback } from 'react';
import { useToast } from '../ui/use-toast';
import imageCompression from 'browser-image-compression';
import { Button } from '../ui/button';
import { Play, Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';

// HD quality settings
const HD_COMPRESSION_OPTIONS = {
  maxSizeMB: 30,
  maxWidthOrHeight: 4096,
  useWebWorker: true,
  fileType: "image/png",
  initialQuality: 1.0,
  alwaysKeepResolution: true
};

// Fast upload settings
const UPLOAD_COMPRESSION_OPTIONS = {
  maxSizeMB: 2,
  maxWidthOrHeight: 2048,
  useWebWorker: true,
  fileType: "image/png",
  initialQuality: 0.8
};

// Batch settings
const BATCH_SIZE = 5;
const MAX_CONCURRENT = 3;

interface ProcessedImage {
  original: string;
  preview: string;
  processed: string | null;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retries: number;
  size: number;
}

interface BulkUploadProcessorProps {
  onImagesProcessed: (images: ProcessedImage[]) => void;
  processingOptions: any;
  removeBackground: (blob: Blob, options: any) => Promise<ArrayBuffer>;
}

export const BulkUploadProcessor = ({ 
  onImagesProcessed, 
  processingOptions,
  removeBackground 
}: BulkUploadProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  // Cleanup function
  const cleanup = (url: string | null) => {
    if (url?.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  // Process single image
  const processImage = async (imageData: string): Promise<string> => {
    try {
      const response = await fetch(imageData);
      const blob = await response.blob();

      // Process in HD quality
      const result = await removeBackground(blob, {
        ...processingOptions,
        progress: (p: number) => setProgress(25 + Math.round(p * 75))
      });

      // Create HD quality output
      const processedBlob = new Blob([result], { type: 'image/png' });
      const hdFile = new File([processedBlob], 'processed.png', { type: 'image/png' });
      
      // Ensure HD quality
      const hdBlob = await imageCompression(hdFile, HD_COMPRESSION_OPTIONS);
      return URL.createObjectURL(hdBlob);
    } catch (error) {
      console.error('Processing error:', error);
      throw error;
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  // Process files in bulk
  const handleBulkProcess = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    const processedImages: ProcessedImage[] = [];
    let processedCount = 0;

    try {
      // Create batches
      const batches = [];
      for (let i = 0; i < selectedFiles.length; i += BATCH_SIZE) {
        batches.push(selectedFiles.slice(i, i + BATCH_SIZE));
      }

      // Process batches
      for (const batch of batches) {
        const batchPromises = batch.map(async (file) => {
          if (!file.type.startsWith('image/')) {
            toast({
              title: "Invalid file",
              description: `${file.name} is not an image file`,
              variant: "destructive",
            });
            return null;
          }

          try {
            // Store original file for HD processing
            const originalUrl = URL.createObjectURL(file);
            
            // Quick initial compression for preview
            const compressedFile = await imageCompression(file, {
              ...UPLOAD_COMPRESSION_OPTIONS,
              onProgress: (p) => setProgress(Math.round(p * 30))
            });
            
            // Convert to data URL for preview
            const previewUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(compressedFile);
            });

            processedCount++;
            setProgress(Math.round((processedCount / selectedFiles.length) * 100));

            return {
              original: originalUrl,
              preview: previewUrl,
              processed: null,
              name: file.name,
              status: 'pending',
              retries: 0,
              size: file.size
            };
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            return null;
          }
        });

        const batchResults = (await Promise.all(batchPromises)).filter(Boolean) as ProcessedImage[];
        processedImages.push(...batchResults);

        // Process images in HD
        for (const image of batchResults) {
          try {
            const processedUrl = await processImage(image.original);
            image.processed = processedUrl;
            image.status = 'completed';
          } catch (error) {
            console.error(`Error processing ${image.name}:`, error);
            image.status = 'failed';
          }
        }
      }

      // Send processed images to parent
      onImagesProcessed(processedImages);

      toast({
        title: "Success",
        description: `Processed ${processedCount} images in HD quality`,
      });
    } catch (error) {
      console.error('Bulk processing error:', error);
      toast({
        title: "Error",
        description: "Some images failed to process",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setSelectedFiles([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
          disabled={isProcessing}
        />
        
        {selectedFiles.length > 0 && (
          <div className="w-full">
            <div className="mb-2 text-sm text-gray-600">
              Selected {selectedFiles.length} files
            </div>
            {isProcessing && (
              <Progress value={progress} className="w-full" />
            )}
          </div>
        )}

        <Button
          onClick={handleBulkProcess}
          disabled={isProcessing || selectedFiles.length === 0}
          className="w-full sm:w-auto"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Bulk Upload...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Process Bulk Upload
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
