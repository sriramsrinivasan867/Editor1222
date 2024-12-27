```typescript
import { create } from 'zustand';

interface EditorState {
  selectedTool: string | null;
  zoom: number;
  setSelectedTool: (tool: string | null) => void;
  setZoom: (zoom: number) => void;
}

export const useImageEditor = create<EditorState>((set) => ({
  selectedTool: null,
  zoom: 100,
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setZoom: (zoom) => set({ zoom }),
}));
```