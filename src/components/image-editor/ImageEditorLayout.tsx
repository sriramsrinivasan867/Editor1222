```tsx
import React from 'react';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';

export const ImageEditorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Toolbar />
        <div className="flex-1 relative">
          <Canvas />
        </div>
      </div>
    </div>
  );
};
```