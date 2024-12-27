import { ImageIcon, Upload, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface SingleImageTabProps {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  onImageUpload: (file: File) => void;
  onProcess: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export const SingleImageTab = ({
  originalImage,
  processedImage,
  isProcessing,
  progress,
  onImageUpload,
  onProcess,
  onClear,
  onDownload,
}: SingleImageTabProps) => {
  return (
    <>
      {/* Original Image Section */}
      <div className="space-y-4 w-full">
        <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageUpload(file);
            }}
            className="hidden"
            id="image-upload"
          />
          
          {originalImage ? (
            <div className="space-y-4">
              <img
                src={originalImage}
                alt="Original"
                className="max-h-[300px] w-full object-contain rounded-lg"
              />
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={onProcess}
                  disabled={isProcessing}
                  className="w-full max-w-xs bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                >
                  {isProcessing ? (
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span>Processing...</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  ) : (
                    "Remove Background"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-gray-600">
                  Drag and drop your image here, or click to select
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Supports JPG, PNG and WEBP
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </label>
          )}
        </div>
      </div>

      {/* Processed Image Section */}
      <div className="space-y-4 w-full">
        <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          {processedImage ? (
            <div className="space-y-4">
              <img
                src={processedImage}
                alt="Processed"
                className="max-h-[300px] w-full object-contain rounded-lg bg-[url('/placeholder.svg')] bg-center bg-cover"
              />
              <Button 
                onClick={onDownload} 
                className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Download className="w-4 h-4" />
                Download Result
              </Button>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-lg">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p>Your processed image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};