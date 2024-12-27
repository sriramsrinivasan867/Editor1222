import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useCallback, useRef, useState } from "react";

interface UploadSectionProps {
  onUpload: (files: FileList) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  multiple?: boolean;
}

export function UploadSection({ onUpload, onDrop, multiple = false }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    onDrop(e);
  }, [onDrop]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Reset input
      }
    }
  }, [onUpload]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <Card 
      className={`relative p-12 border-2 border-dashed rounded-lg transition-all duration-200 ease-in-out
        ${isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
        }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={handleFileInputChange}
        onClick={e => {
          // Reset file input value to allow selecting the same file again
          (e.target as HTMLInputElement).value = '';
        }}
      />

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <ImageIcon className="w-8 h-8 text-primary" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">
            {isDragging ? 'Drop images here' : 'Upload your images'}
          </h3>
          <p className="text-sm text-gray-500">
            Drop your images here or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supports: PNG, JPG, JPEG, WebP
          </p>
        </div>

        <Button 
          onClick={handleButtonClick}
          className="relative overflow-hidden"
          variant="outline"
          size="lg"
        >
          <Upload className="w-4 h-4 mr-2" />
          Browse Files
        </Button>
      </div>

      {/* Overlay for drag and drop */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/5 rounded-lg flex items-center justify-center">
          <div className="text-lg font-semibold text-primary">
            Drop your images here
          </div>
        </div>
      )}
    </Card>
  );
}