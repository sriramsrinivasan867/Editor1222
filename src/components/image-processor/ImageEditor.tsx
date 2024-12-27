import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageEditorProps {
  processedImage: string;
  onImageUpdate: (newImage: string) => void;
}

export const ImageEditor = ({ processedImage, onImageUpdate }: ImageEditorProps) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [activeFeature, setActiveFeature] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);

  const handleCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        onImageUpdate(croppedCanvas.toDataURL());
      }
    }
  };

  const handleRotate = (degree: number) => {
    const newRotation = rotation + degree;
    setRotation(newRotation);
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    if (cropper) {
      cropper.rotateTo(newRotation);
    }
  };

  const handleZoom = (value: number) => {
    setZoom(value);
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    if (cropper) {
      cropper.zoomTo(value);
    }
  };

  const handleFilter = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      const ctx = canvas.getContext('2d');
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(canvas, 0, 0);
      onImageUpdate(canvas.toDataURL());
    }
  };

  const handleReset = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    if (cropper) {
      cropper.reset();
      setZoom(1);
      setRotation(0);
      setBrightness(100);
      setContrast(100);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background p-4 space-y-4">
      {/* SEO-friendly header */}
      <h1 className="sr-only">Image Editor - Edit, Crop, Rotate, and Filter Your Images</h1>
      
      {/* Main editor area */}
      <div className="relative flex-grow min-h-[400px] max-h-[70vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <Cropper
          ref={cropperRef}
          src={processedImage}
          style={{ height: '100%', width: '100%' }}
          initialAspectRatio={16 / 9}
          guides={true}
          responsive={true}
          modal={true}
          zoomable={true}
          scalable={true}
          rotatable={true}
          viewMode={2}
          minContainerWidth={300}
          minContainerHeight={300}
          className="!max-w-full !max-h-full"
        />
      </div>

      {/* Mobile-responsive toolbar */}
      <div className="flex flex-wrap gap-4 justify-center p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveFeature('crop')}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
            aria-label="Crop tool"
          >
            Crop
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleRotate(90)}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
            aria-label="Rotate right"
          >
            Rotate
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="zoom" className="text-sm">Zoom</label>
          <input
            id="zoom"
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => handleZoom(parseFloat(e.target.value))}
            className="w-32"
            aria-label="Zoom level"
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="brightness" className="text-sm">Brightness</label>
          <input
            id="brightness"
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="w-32"
            aria-label="Brightness level"
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="contrast" className="text-sm">Contrast</label>
          <input
            id="contrast"
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(parseInt(e.target.value))}
            className="w-32"
            aria-label="Contrast level"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
            aria-label="Apply filters"
          >
            Apply Filters
          </button>
          <button
            onClick={handleCrop}
            className="p-2 rounded-lg bg-success text-white hover:bg-success-dark"
            aria-label="Save changes"
          >
            Save
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-danger text-white hover:bg-danger-dark"
            aria-label="Reset changes"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;