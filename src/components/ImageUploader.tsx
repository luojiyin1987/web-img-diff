import { useCallback, useRef, useState, DragEvent, ChangeEvent } from 'react'

interface Props {
  label: string
  onImageLoad: (image: HTMLImageElement) => void
  onClear: () => void
  image: HTMLImageElement | null
  disabled?: boolean
}

export function ImageUploader({
  label,
  onImageLoad,
  onClear,
  image,
  disabled,
}: Props) {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => onImageLoad(img)
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    },
    [onImageLoad],
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragging(false), [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  return (
    <div className={`uploader ${disabled ? 'uploader--disabled' : ''}`}>
      <div className="uploader-label">{label}</div>
      {image ? (
        <div className="uploader-preview">
          <img src={image.src} alt={label} />
          <button
            className="uploader-clear"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
          >
            ✕
          </button>
          <div className="uploader-info">
            {image.naturalWidth} × {image.naturalHeight}
          </div>
        </div>
      ) : (
        <div
          className={`uploader-zone ${dragging ? 'uploader-zone--dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <span>拖拽或点击上传</span>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        hidden
      />
    </div>
  )
}
