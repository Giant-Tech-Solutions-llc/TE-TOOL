// Browser-only helpers. Downscale large phone photos before sending to the API
// so the JSON body stays well under Vercel's 4.5 MB request limit and the
// model gets a sensibly sized image (faster + cheaper).

const DEFAULT_MAX_DIM = 1280;
const DEFAULT_QUALITY = 0.85;

function readImage(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function prepareUploadPhoto(file, options = {}) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    throw new Error('Not an image file');
  }
  const maxDim = options.maxDim || DEFAULT_MAX_DIM;
  const quality = options.quality || DEFAULT_QUALITY;

  let img;
  try {
    img = await readImage(file);
  } catch {
    // Fallback: just data-url the original file
    const dataUrl = await blobToDataUrl(file);
    return {
      dataUrl,
      mimeType: file.type,
      size: file.size,
      width: null,
      height: null,
      downscaled: false
    };
  }

  let { width, height } = img;
  const longest = Math.max(width, height);
  const scale = longest > maxDim ? maxDim / longest : 1;
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/jpeg', quality));
  if (!blob) {
    const dataUrl = await blobToDataUrl(file);
    return {
      dataUrl,
      mimeType: file.type,
      size: file.size,
      width,
      height,
      downscaled: false
    };
  }

  const dataUrl = await blobToDataUrl(blob);
  return {
    dataUrl,
    mimeType: 'image/jpeg',
    size: blob.size,
    width: targetW,
    height: targetH,
    downscaled: scale < 1
  };
}
