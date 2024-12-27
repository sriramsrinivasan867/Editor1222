import { useState, useCallback } from 'react';

interface ImageAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
}

export const useImageAdjustments = (onImageUpdate: (newImage: string) => void) => {
  const [adjustments, setAdjustments] = useState<ImageAdjustments>({
    brightness: 100,
    contrast: 100,
    saturation: 100
  });

  const updateAdjustment = useCallback((
    type: keyof ImageAdjustments,
    value: number[],
    originalImage: string
  ) => {
    const newValue = value[0];
    
    setAdjustments(prev => ({
      ...prev,
      [type]: newValue
    }));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        const { brightness, contrast, saturation } = {
          ...adjustments,
          [type]: newValue
        };

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx.drawImage(img, 0, 0);
        onImageUpdate(canvas.toDataURL('image/png'));
      }
    };
    
    img.src = originalImage;
  }, [adjustments, onImageUpdate]);

  return {
    adjustments,
    updateAdjustment
  };
};