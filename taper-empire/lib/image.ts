// Client-side image preparation: downscale large photos before upload.
const MAX_DIMENSION = 1280
const JPEG_QUALITY = 0.85

export interface PreparedPhoto {
  dataUrl: string
  mimeType: string
  size: number
  downscaled: boolean
}

export async function prepareUploadPhoto(file: File): Promise<PreparedPhoto> {
  const arrayBuffer = await file.arrayBuffer()
  const blob = new Blob([arrayBuffer], { type: file.type })
  const bitmap = await createImageBitmap(blob)

  const longestSide = Math.max(bitmap.width, bitmap.height)
  const needsResize = longestSide > MAX_DIMENSION

  if (!needsResize) {
    const reader = new FileReader()
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    bitmap.close?.()
    return { dataUrl, mimeType: file.type, size: file.size, downscaled: false }
  }

  const scale = MAX_DIMENSION / longestSide
  const w = Math.round(bitmap.width * scale)
  const h = Math.round(bitmap.height * scale)
  const canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : document.createElement('canvas')
  if (!(canvas instanceof OffscreenCanvas)) { canvas.width = w; canvas.height = h }
  const ctx = (canvas as any).getContext('2d')
  ctx.drawImage(bitmap, 0, 0, w, h)

  let outBlob: Blob
  if (canvas instanceof OffscreenCanvas) {
    outBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality: JPEG_QUALITY })
  } else {
    outBlob = await new Promise<Blob>((resolve) => {
      (canvas as HTMLCanvasElement).toBlob((b) => resolve(b as Blob), 'image/jpeg', JPEG_QUALITY)
    })
  }
  bitmap.close?.()

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(outBlob)
  })
  return { dataUrl, mimeType: 'image/jpeg', size: outBlob.size, downscaled: true }
}
