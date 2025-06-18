import imageCompression from 'browser-image-compression';

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    initialQuality: 0.7,
    maxIteration: 4,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    if (compressedFile.size > 500 * 1024) {
      options.maxSizeMB = 0.3;
      options.initialQuality = 0.6;
      return await imageCompression(file, options);
    }
    
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
