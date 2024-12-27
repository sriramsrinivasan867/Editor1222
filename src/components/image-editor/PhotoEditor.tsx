'use client'

import { useState } from 'react'
import { 
  Home, 
  Monitor, 
  Copy, 
  Scissors, 
  Sliders, 
  Info, 
  Dice4, 
  History, 
  Pencil, 
  Eraser, 
  Type, 
  AlignLeft, 
  Plus, 
  ZoomIn, 
  ZoomOut, 
  Undo2, 
  Redo2, 
  Save, 
  X 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useDropzone } from 'react-dropzone'

export function PhotoEditor() {
  const [image, setImage] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 10))
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-zinc-950">
        {/* Left Toolbar */}
        <div className="w-16 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
          <ToolbarButton icon={<Home size={20} />} tooltip="Home" />
          <ToolbarButton icon={<Monitor size={20} />} tooltip="Preview" />
          <ToolbarButton icon={<Copy size={20} />} tooltip="Copy" />
          <ToolbarButton icon={<Scissors size={20} />} tooltip="Cut" />
          <ToolbarButton icon={<Sliders size={20} />} tooltip="Adjust" />
          <ToolbarButton icon={<Info size={20} />} tooltip="Info" />
          <ToolbarButton icon={<Dice4 size={20} />} tooltip="Effects" />
          <ToolbarButton icon={<History size={20} />} tooltip="History" />
          <ToolbarButton icon={<Pencil size={20} />} tooltip="Draw" />
          <ToolbarButton icon={<Eraser size={20} />} tooltip="Erase" />
          <ToolbarButton icon={<Type size={20} />} tooltip="Text" />
          <ToolbarButton icon={<AlignLeft size={20} />} tooltip="Align" />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <div 
              {...getRootProps()} 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {image ? (
                <div 
                  className="relative w-full h-full flex items-center justify-center bg-zinc-900"
                  style={{ overflow: 'hidden' }}
                >
                  <img 
                    src={image} 
                    alt="Uploaded" 
                    className="max-w-full max-h-full object-contain"
                    style={{ 
                      transform: `scale(${zoom / 100})`,
                      transition: 'transform 0.2s ease-in-out'
                    }}
                  />
                </div>
              ) : (
                <div className="w-96 h-96 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 text-center p-4">
                  {isDragActive ? (
                    <p>Drop the image here ...</p>
                  ) : (
                    <p>Drag and drop an image here, or click to select</p>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Bottom Status Bar */}
          <div className="h-12 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-400 hover:text-white"
                onClick={handleZoomOut}
              >
                <ZoomOut size={20} />
              </Button>
              <span className="text-zinc-400">{zoom}%</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-400 hover:text-white"
                onClick={handleZoomIn}
              >
                <ZoomIn size={20} />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <Undo2 size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <Redo2 size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <Save size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-zinc-900 border-l border-zinc-800">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">Layers</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-64px)]">
            <div className="p-4 space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Plus size={20} className="mr-2" />
                Add Layer
              </Button>
              {image && (
                <Card className="bg-zinc-800 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-zinc-700 rounded overflow-hidden">
                        <img
                          src={image}
                          alt="Layer preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-zinc-300">Background</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-zinc-400 hover:text-white"
                      onClick={() => setImage(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  )
}

function ToolbarButton({ icon, tooltip }: { icon: React.ReactNode; tooltip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
