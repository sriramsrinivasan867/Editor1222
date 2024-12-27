import { useState } from 'react';
import { Eraser } from 'lucide-react';
import { Button } from '../../ui/button';
import { Slider } from '../../ui/slider';
import { fabric } from 'fabric';

interface EraseToolProps {
  fabricCanvas: fabric.Canvas | null;
}

export const EraseTool = ({ fabricCanvas }: EraseToolProps) => {
  const [isActive, setIsActive] = useState(false);
  const [brushSize, setBrushSize] = useState(20);

  const startErasing = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.isDrawingMode = true;
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.width = brushSize;
      fabricCanvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
      (fabricCanvas.freeDrawingBrush as any).globalCompositeOperation = 'destination-out';
    }
  };

  const stopErasing = () => {
    if (!fabricCanvas) return;
    fabricCanvas.isDrawingMode = false;
  };

  return (
    <div className="space-y-2">
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={() => {
          setIsActive(!isActive);
          if (!isActive) {
            startErasing();
          } else {
            stopErasing();
          }
        }}
        className="flex items-center gap-2"
      >
        <Eraser className="w-4 h-4" /> Erase
      </Button>

      {isActive && (
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Brush Size: {brushSize}px</label>
          <Slider
            value={[brushSize]}
            onValueChange={([value]) => {
              setBrushSize(value);
              if (fabricCanvas?.freeDrawingBrush) {
                fabricCanvas.freeDrawingBrush.width = value;
              }
            }}
            min={1}
            max={100}
            step={1}
          />
        </div>
      )}
    </div>
  );
};