interface Props {
  diffDataUrl: string | null
  diffMask: boolean
}

export function ImagePreview({ diffDataUrl, diffMask }: Props) {
  return (
    <div className="preview">
      <div className="preview-card">
        <h3 className="preview-title">差异结果</h3>
        <div
          className={`preview-canvas ${diffMask ? 'preview-canvas--mask' : ''}`}
        >
          {diffDataUrl ? (
            <img src={diffDataUrl} alt="diff" />
          ) : (
            <div className="preview-empty">对比结果将在此显示</div>
          )}
        </div>
      </div>
    </div>
  )
}
