```tsx
import React from 'react';
import { ChevronUp, ChevronDown, Copy, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const Toolbar = () => {
  return (
    <div className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Page 1 - Add Title"
          className="h-8 w-48"
        />
        <Button variant="ghost" size="icon">
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
```