import { useState, useEffect } from 'react'
import { compareImages, DiffOptions } from '../utils/imageDiff'

export interface DiffResult {
  diffDataUrl: string | null
  diffCount: number
  totalPixels: number
  processing: boolean
  error: string | null
}

export function useImageDiff(
  imageA: HTMLImageElement | null,
  imageB: HTMLImageElement | null,
  options: DiffOptions,
): DiffResult {
  const [result, setResult] = useState<DiffResult>({
    diffDataUrl: null,
    diffCount: 0,
    totalPixels: 0,
    processing: false,
    error: null,
  })

  useEffect(() => {
    if (!imageA || !imageB) {
      setResult({
        diffDataUrl: null,
        diffCount: 0,
        totalPixels: 0,
        processing: false,
        error: null,
      })
      return
    }

    setResult((prev) => ({ ...prev, processing: true, error: null }))

    const id = requestAnimationFrame(() => {
      try {
        const { diffCount, diffDataUrl, width, height } = compareImages(
          imageA,
          imageB,
          options,
        )
        setResult({
          diffDataUrl,
          diffCount,
          totalPixels: width * height,
          processing: false,
          error: null,
        })
      } catch (err) {
        setResult((prev) => ({
          ...prev,
          processing: false,
          error: err instanceof Error ? err.message : '对比失败',
        }))
      }
    })

    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageA, imageB, JSON.stringify(options)])

  return result
}
