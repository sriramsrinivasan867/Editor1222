```tsx
import React, { useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';

export const Canvas = () => {
  const stageRef = useRef(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-[#f7f7f7] flex items-center justify-center"
    >
      <div className="bg-white shadow-lg" style={{ width: 1080, height: 1080 }}>
        <Stage
          ref={stageRef}
          width={1080}
          height={1080}
        >
          <Layer>
            {/* Canvas content will go here */}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
```