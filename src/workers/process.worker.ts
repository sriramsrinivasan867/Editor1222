import { removeBackground } from '@imgly/background-removal';

self.onmessage = async (e) => {
  try {
    const { imageData, options } = e.data;

    // Fetch the image data
    const response = await fetch(imageData);
    const imageBlob = await response.blob();

    // Remove background
    const result = await removeBackground(imageBlob, {
      ...options,
      progress: (p: number) => {
        self.postMessage({ type: 'progress', progress: p });
      }
    });

    // Create blob URL
    const processedBlob = new Blob([result], { type: 'image/png' });
    const url = URL.createObjectURL(processedBlob);

    self.postMessage({ type: 'complete', result: url });
  } catch (error) {
    self.postMessage({ type: 'error', error: error.message });
  }
};
