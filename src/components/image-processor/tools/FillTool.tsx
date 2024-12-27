import { useState } from 'react';
import { PaintBucket } from 'lucide-react';
import { Button } from '../../ui/button';
import { HexColorPicker } from 'react-colorful';
import { fabric } from 'fabric';

interface FillToolProps {
  fabricCanvas: fabric.Canvas | null;
}

export const FillTool = ({ fabricCanvas }: FillToolProps) => {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState('#ffffff');

  const handleFill = () => {
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.set('fill', color);
      fabricCanvas.renderAll();
    } else {
      fabricCanvas.backgroundColor = color;
      fabricCanvas.renderAll();
    }
  };

  return (
    <div className="space-y-2">
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={() => setIsActive(!isActive)}
        className="flex items-center gap-2"
      >
        <PaintBucket className="w-4 h-4" /> Fill
      </Button>

      {isActive && (
        <div className="space-y-2 p-2 border rounded-lg">
          <HexColorPicker color={color} onChange={setColor} />
          <Button 
            onClick={handleFill}
            className="w-full mt-2"
          >
            Apply Fill
          </Button>
        </div>
      )}
    </div>
  );
};