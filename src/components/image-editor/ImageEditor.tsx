'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, Image as FabricImage } from 'fabric'
import { useDropzone } from 'react-dropzone'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SketchPicker } from 'react-color'
import { 
  Image, 
  Crop, 
  ExpandIcon as Adjust, 
  Wand2, 
  Eraser, 
  Pen, 
  Type, 
  Shapes, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  Undo2, 
  Redo2, 
  Save 
} from 'lucide-react'

export default function ImageEditor() {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const [activeTab, setActiveTab] = useState('adjust')
  const [color, setColor] = useState('#000000')
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
      })
      setCanvas(newCanvas)
    }
  }, [])

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const fabricImage = new FabricImage(img as HTMLImageElement)
        if (canvas) {
          canvas.add(fabricImage)
          canvas.renderAll()
        }
      }
      img.src = event.target?.result as string
    }

    reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const applyFilter = () => {
    if (canvas) {
      canvas.getObjects().forEach((obj) => {
        if (obj instanceof FabricImage) {
          obj.filters = [
            new FabricImage.filters.Brightness({ brightness: (brightness - 100) / 100 }),
            new FabricImage.filters.Contrast({ contrast: (contrast - 100) / 100 }),
          ]
          obj.applyFilters()
        }
      })
      canvas.renderAll()
    }
  }

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText('Edit me', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fill: color,
        fontSize: 20,
      })
      canvas.add(text)
      canvas.renderAll()
    }
  }

  const addShape = (shape: 'rect' | 'circle') => {
    if (canvas) {
      let fabricShape
      if (shape === 'rect') {
        fabricShape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: color,
          width: 100,
          height: 100,
        })
      } else {
        fabricShape = new fabric.Circle({
          left: 100,
          top: 100,
          fill: color,
          radius: 50,
        })
      }
      canvas.add(fabricShape)
      canvas.renderAll()
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-zinc-900 p-4 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="adjust"><Adjust size={20} /></TabsTrigger>
            <TabsTrigger value="draw"><Pen size={20} /></TabsTrigger>
            <TabsTrigger value="text"><Type size={20} /></TabsTrigger>
          </TabsList>
          <TabsContent value="adjust">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-white">Brightness</label>
                <Slider
                  value={[brightness]}
                  onValueChange={(value) => setBrightness(value[0])}
                  min={0}
                  max={200}
                  step={1}
                />
              </div>
              <div>
                <label className="block mb-2 text-white">Contrast</label>
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                  min={0}
                  max={200}
                  step={1}
                />
              </div>
              <Button onClick={applyFilter}>Apply Filters</Button>
            </div>
          </TabsContent>
          <TabsContent value="draw">
            <div className="space-y-4">
              <SketchPicker color={color} onChange={(color) => setColor(color.hex)} />
              <Button onClick={() => addShape('rect')}>Add Rectangle</Button>
              <Button onClick={() => addShape('circle')}>Add Circle</Button>
            </div>
          </TabsContent>
          <TabsContent value="text">
            <div className="space-y-4">
              <Input type="text" placeholder="Enter text" className="bg-zinc-800 text-white" />
              <SketchPicker color={color} onChange={(color) => setColor(color.hex)} />
              <Button onClick={addText}>Add Text</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex-1 p-4 bg-zinc-950">
        <div {...getRootProps()} className="border-2 border-dashed border-zinc-700 rounded-lg p-4 mb-4 text-zinc-400 text-center">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
        <canvas ref={canvasRef} className="bg-zinc-900 rounded-lg" />
      </div>
      <div className="w-64 bg-zinc-900 p-4">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="icon"><ZoomIn size={20} /></Button>
          <Button variant="outline" size="icon"><ZoomOut size={20} /></Button>
          <Button variant="outline" size="icon"><Crop size={20} /></Button>
          <Button variant="outline" size="icon"><RotateCcw size={20} /></Button>
          <Button variant="outline" size="icon"><RotateCw size={20} /></Button>
          <Button variant="outline" size="icon"><Wand2 size={20} /></Button>
          <Button variant="outline" size="icon"><Undo2 size={20} /></Button>
          <Button variant="outline" size="icon"><Redo2 size={20} /></Button>
          <Button variant="outline" size="icon"><Save size={20} /></Button>
        </div>
      </div>
    </div>
  )
}
  