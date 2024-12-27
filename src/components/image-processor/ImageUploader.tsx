import { Upload, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useToast } from "../ui/use-toast";
import imageCompression from "browser-image-compression";

interface ImageUploaderProps {
  originalImage: string | null;
  isProcessing: boolean;
  progress: number;
  onImageUpload: (file: File) => void;
  onProcess: () => void;
  onClear: () => void;
}

export const ImageUploader = ({
  originalImage,
  isProcessing,
  progress,
  onImageUpload,
  onProcess,
  onClear,
}: ImageUploaderProps) => {
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Compress image before processing
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });

    onImageUpload(compressedFile);
  };

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
      {originalImage ? (
        <div>
          <img
            src={originalImage}
            alt="Original"
            className="max-h-[400px] mx-auto mb-4"
          />
          <div className="flex gap-2 justify-center">
            <Button
              onClick={onProcess}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  Processing...
                  <Progress value={progress} className="w-full mt-2" />
                </>
              ) : (
                "Remove Background"
              )}
            </Button>
            <Button
              variant="destructive"
              onClick={onClear}
              className="px-3"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="cursor-pointer block p-8"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Click or drag image to upload
          </p>
        </label>
      )}
    </div>
  );
};