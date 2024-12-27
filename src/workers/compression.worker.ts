import imageCompression from 'browser-image-compression';

const QUALITY_OPTIONS = {
  maxSizeMB: 15,
  maxWidthOrHeight: 4096,
  useWebWorker: true,
  fileType: "image/png",
  initialQuality: 1,
  alwaysKeepResolution: true,
};

self.addEventListener('message', async (e: MessageEvent) => {
  try {
    const { file, options } = e.data;
    const compressedFile = await imageCompression(file, {
      ...QUALITY_OPTIONS,
      ...options,
    });
    self.postMessage({ success: true, result: compressedFile });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
});
