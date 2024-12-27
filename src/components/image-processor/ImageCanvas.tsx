import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface ImageCanvasProps {
  image: string;
  onImageUpdate: (newImage: string) => void;
}

export const ImageCanvas = ({ image, onImageUpdate }: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    // Load image
    fabric.Image.fromURL(image, (img) => {
      if (!fabricRef.current) return;
      
      // Scale image to fit canvas
      const scale = Math.min(
        800 / img.width!,
        600 / img.height!
      );
      
      img.scale(scale);
      img.center();
      
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    });

    return () => {
      fabricRef.current?.dispose();
    };
  }, [image]);

  return <canvas ref={canvasRef} />;
};