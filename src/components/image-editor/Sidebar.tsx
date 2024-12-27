```tsx
import React from 'react';
import { Text, Image, Pencil, Square, Layout, Grid, FolderOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const tools = [
  { icon: Text, label: 'Text' },
  { icon: Image, label: 'Canvas Crop' },
  { icon: Pencil, label: 'Draw' },
  { icon: Square, label: 'Shapes' },
  { icon: Layout, label: 'Background' },
  { icon: Grid, label: 'More Tools' },
  { icon: Grid, label: 'Collages' },
  { icon: Layout, label: 'Batch' },
  { icon: Layout, label: 'Brand Kits' },
  { icon: FolderOpen, label: 'My Folders' },
];

export const Sidebar = () => {
  return (
    <div className="w-[72px] bg-white border-r border-gray-200 flex flex-col">
      {tools.map((Tool, index) => (
        <Tooltip key={index} delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-[72px] rounded-none hover:bg-gray-100"
            >
              <Tool.icon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{Tool.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
```