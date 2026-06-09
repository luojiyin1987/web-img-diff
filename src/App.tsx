import { useState, useMemo } from 'react'
import { ImageUploader } from './components/ImageUploader'
import { ControlPanel } from './components/ControlPanel'
import { ImagePreview } from './components/ImagePreview'
import { DiffStats } from './components/DiffStats'
import { useImageDiff } from './hooks/useImageDiff'
import { DiffOptions } from './utils/imageDiff'
import './App.css'

export default function App() {
  const [imageA, setImageA] = useState<HTMLImageElement | null>(null)
  const [imageB, setImageB] = useState<HTMLImageElement | null>(null)
  const [threshold, setThreshold] = useState(0.1)
  const [diffColor, setDiffColor] = useState<[number, number, number]>([
    255, 0, 0,
  ])
  const [aaColor, setAaColor] = useState<[number, number, number]>([
    255, 255, 0,
  ])
  const [diffMask, setDiffMask] = useState(false)

  const options: DiffOptions = useMemo(
    () => ({ threshold, diffColor, aaColor, diffMask }),
    [threshold, diffColor, aaColor, diffMask],
  )

  const { diffDataUrl, diffCount, totalPixels, processing, error } =
    useImageDiff(imageA, imageB, options)

  const ready = imageA !== null && imageB !== null

  const sizeMismatch =
    ready &&
    (imageA.naturalWidth !== imageB.naturalWidth ||
      imageA.naturalHeight !== imageB.naturalHeight)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Web Image Diff</h1>
        <p>基于 pixelmatch 的像素级图片差异对比工具</p>
      </header>

      <main className="app-main">
        <section className="upload-section">
          <ImageUploader
            label="图片 A"
            onImageLoad={setImageA}
            onClear={() => setImageA(null)}
            image={imageA}
          />
          <ImageUploader
            label="图片 B"
            onImageLoad={setImageB}
            onClear={() => setImageB(null)}
            image={imageB}
          />
        </section>

        {sizeMismatch && (
          <div className="notice">
            图片尺寸不一致（
            {imageA.naturalWidth}×{imageA.naturalHeight} vs{' '}
            {imageB.naturalWidth}×{imageB.naturalHeight}
            ），已自动等比缩放至较小尺寸进行对比
          </div>
        )}

        {ready && (
          <>
            <ControlPanel
              threshold={threshold}
              onThresholdChange={setThreshold}
              diffColor={diffColor}
              onDiffColorChange={setDiffColor}
              aaColor={aaColor}
              onAaColorChange={setAaColor}
              diffMask={diffMask}
              onDiffMaskChange={setDiffMask}
            />

            {processing && <div className="notice">处理中...</div>}
            {error && <div className="error">{error}</div>}

            {!processing && !error && (
              <>
                <ImagePreview diffDataUrl={diffDataUrl} diffMask={diffMask} />
                <DiffStats diffCount={diffCount} totalPixels={totalPixels} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
