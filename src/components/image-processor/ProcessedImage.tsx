import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

interface ProcessedImageProps {
  processedImage: string | null;
  onDownload: () => void;
  quality: number;
  onQualityChange: (value: number) => void;
}

export const ProcessedImage = ({ 
  processedImage, 
  onDownload,
  quality,
  onQualityChange 
}: ProcessedImageProps) => {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
      {processedImage ? (
        <div>
          <img
            src={processedImage}
            alt="Processed"
            className="max-h-[400px] mx-auto mb-4"
          />
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label>Quality: {quality}%</Label>
              <Slider
                value={[quality]}
                onValueChange={(values) => onQualityChange(values[0])}
                min={1}
                max={100}
                step={1}
                className="w-[60%]"
              />
              <span className="text-sm font-medium">HD</span>
            </div>
            <Button onClick={onDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download HD
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-400">
            Processed image will appear here
          </p>
        </div>
      )}
    </div>
  );
};