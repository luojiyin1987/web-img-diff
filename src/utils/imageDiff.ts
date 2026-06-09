import pixelmatch from 'pixelmatch'

export interface DiffOptions {
  threshold: number
  diffColor: [number, number, number]
  aaColor: [number, number, number]
  diffMask: boolean
}

export function loadImageToImageData(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
): ImageData {
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
  return ctx.getImageData(0, 0, targetWidth, targetHeight)
}

export function imageDataToDataURL(
  width: number,
  height: number,
  data: Uint8ClampedArray,
): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.putImageData(new ImageData(data, width, height), 0, 0)
  return canvas.toDataURL()
}

export function compareImages(
  img1: HTMLImageElement,
  img2: HTMLImageElement,
  options: DiffOptions,
): {
  diffCount: number
  diffDataUrl: string
  width: number
  height: number
} {
  const width = Math.min(img1.naturalWidth, img2.naturalWidth)
  const height = Math.min(img1.naturalHeight, img2.naturalHeight)

  const img1Data = loadImageToImageData(img1, width, height)
  const img2Data = loadImageToImageData(img2, width, height)

  const diff = new Uint8ClampedArray(width * height * 4)
  const diffCount = pixelmatch(img1Data.data, img2Data.data, diff, width, height, {
    threshold: options.threshold,
    diffColor: options.diffColor,
    aaColor: options.aaColor,
    diffMask: options.diffMask,
    includeAA: false,
    alpha: 0.1,
  })

  const diffDataUrl = imageDataToDataURL(width, height, diff)
  return { diffCount, diffDataUrl, width, height }
}

export function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')
}
