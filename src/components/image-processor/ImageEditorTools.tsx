import { useState } from "react";
import { CropTool } from "./tools/CropTool";
import { EraseTool } from "./tools/EraseTool";
import { FillTool } from "./tools/FillTool";
import { MagicBrush } from "./tools/MagicBrush";
import { fabric } from 'fabric';

interface ImageEditorToolsProps {
  processedImage: string;
  onImageUpdate: (newImage: string) => void;
}

export const ImageEditorTools = ({ processedImage, onImageUpdate }: ImageEditorToolsProps) => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CropTool imageRef={imageElement} onImageUpdate={onImageUpdate} />
        <EraseTool fabricCanvas={fabricCanvas} />
        <FillTool fabricCanvas={fabricCanvas} />
        <MagicBrush imageRef={imageElement} onImageUpdate={onImageUpdate} />
      </div>
      
      <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-gray-50">
        <img
          src={processedImage}
          alt="Editor preview"
          className="w-full h-full object-contain"
          onLoad={(e) => setImageElement(e.target as HTMLImageElement)}
        />
        <canvas id="editor-canvas" className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};