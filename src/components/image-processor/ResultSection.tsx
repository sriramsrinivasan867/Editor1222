import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LazyImage } from "@/components/ui/lazy-image";
import { Trash2, Download, Play, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface ResultSectionProps {
  originalImage: string;
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  onProcess: () => void;
  onDelete: () => void;
  onDownload: () => void;
  totalImages: number;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ResultSection({
  originalImage,
  processedImage,
  isProcessing,
  progress,
  onProcess,
  onDelete,
  onDownload,
  totalImages,
  currentIndex,
  onNavigate,
}: ResultSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll into view when image changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentIndex, processedImage]);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Original Image */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Original Image</h2>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            {originalImage ? (
              <LazyImage
                src={originalImage}
                alt="Original"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No image selected</p>
              </div>
            )}
          </div>
        </div>

        {/* Processed Image */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Processed Image</h2>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            {processedImage ? (
              <LazyImage
                src={processedImage}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-6 p-6">
                {isProcessing ? (
                  <div className="w-full max-w-[240px] space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                        style={{
                          animationDuration: '1s',
                          animationTimingFunction: 'linear',
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">{progress}%</span>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">Processing Image</h3>
                      <p className="text-sm text-gray-500">
                        Removing background...
                      </p>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium mb-2">
                        Ready to Process
                      </p>
                      <p className="text-sm text-gray-400">
                        Click the Process button below to remove background
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Navigation */}
      {totalImages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 min-w-[100px] text-center">
            Image {currentIndex + 1} of {totalImages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={currentIndex === totalImages - 1}
            className="hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onDelete}
          className="w-full sm:w-40 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>

        <Button
          size="lg"
          onClick={onProcess}
          disabled={isProcessing || !originalImage}
          className="w-full sm:w-40 relative"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Process
            </>
          )}
        </Button>

        {processedImage && (
          <Button
            variant="default"
            size="lg"
            onClick={onDownload}
            disabled={isProcessing}
            className="w-full sm:w-40 hover:bg-primary/90 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </div>
    </div>
  );
}