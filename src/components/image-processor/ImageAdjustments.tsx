import { useImageAdjustments } from "@/hooks/use-image-adjustments";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

interface ImageAdjustmentsProps {
  processedImage: string;
  onImageUpdate: (newImage: string) => void;
}

export const ImageAdjustments = ({ processedImage, onImageUpdate }: ImageAdjustmentsProps) => {
  const { adjustments, updateAdjustment } = useImageAdjustments(onImageUpdate);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Brightness ({adjustments.brightness}%)</Label>
          <Slider
            defaultValue={[adjustments.brightness]}
            onValueChange={(value) => updateAdjustment('brightness', value, processedImage)}
            min={0}
            max={200}
            step={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Contrast ({adjustments.contrast}%)</Label>
          <Slider
            defaultValue={[adjustments.contrast]}
            onValueChange={(value) => updateAdjustment('contrast', value, processedImage)}
            min={0}
            max={200}
            step={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Saturation ({adjustments.saturation}%)</Label>
          <Slider
            defaultValue={[adjustments.saturation]}
            onValueChange={(value) => updateAdjustment('saturation', value, processedImage)}
            min={0}
            max={200}
            step={1}
          />
        </div>
      </div>
      
      <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-gray-50">
        <img
          src={processedImage}
          alt="Adjustments preview"
          className="w-full h-full object-contain"
          style={{
            filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`
          }}
        />
      </div>
    </div>
  );
};