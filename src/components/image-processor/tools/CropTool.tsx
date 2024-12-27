import { useState } from 'react';
import { Crop } from 'lucide-react';
import { Button } from '../../ui/button';
import ReactCrop, { Crop as CropType } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropToolProps {
  imageRef: HTMLImageElement | null;
  onImageUpdate: (newImage: string) => void;
}

export const CropTool = ({ imageRef, onImageUpdate }: CropToolProps) => {
  const [crop, setCrop] = useState<CropType>();
  const [isActive, setIsActive] = useState(false);

  const handleCropComplete = (crop: CropType) => {
    if (!imageRef || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      imageRef,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    onImageUpdate(canvas.toDataURL('image/png'));
    setIsActive(false);
  };

  return (
    <div className="w-full">
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={() => setIsActive(!isActive)}
        className="w-full flex items-center justify-center gap-2"
      >
        <Crop className="w-4 h-4" />
        <span>Crop</span>
      </Button>

      {isActive && imageRef && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={handleCropComplete}
            >
              <img src={imageRef.src} alt="Crop preview" />
            </ReactCrop>
          </div>
        </div>
      )}
    </div>
  );
};