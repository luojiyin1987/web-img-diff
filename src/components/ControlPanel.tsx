import { rgbToHex, hexToRgb } from '../utils/imageDiff'

interface Props {
  threshold: number
  onThresholdChange: (v: number) => void
  diffColor: [number, number, number]
  onDiffColorChange: (v: [number, number, number]) => void
  aaColor: [number, number, number]
  onAaColorChange: (v: [number, number, number]) => void
  diffMask: boolean
  onDiffMaskChange: (v: boolean) => void
}

export function ControlPanel({
  threshold,
  onThresholdChange,
  diffColor,
  onDiffColorChange,
  aaColor,
  onAaColorChange,
  diffMask,
  onDiffMaskChange,
}: Props) {
  return (
    <div className="controls">
      <div className="control-group">
        <label>
          阈值{' '}
          <span className="control-value">{threshold.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={threshold}
          onChange={(e) => onThresholdChange(Number(e.target.value))}
        />
        <div className="control-hint">越小越敏感</div>
      </div>
      <div className="control-group">
        <label>差异颜色</label>
        <div className="control-color">
          <input
            type="color"
            value={rgbToHex(diffColor)}
            onChange={(e) => onDiffColorChange(hexToRgb(e.target.value))}
          />
          <span>{rgbToHex(diffColor)}</span>
        </div>
      </div>
      <div className="control-group">
        <label>抗锯齿颜色</label>
        <div className="control-color">
          <input
            type="color"
            value={rgbToHex(aaColor)}
            onChange={(e) => onAaColorChange(hexToRgb(e.target.value))}
          />
          <span>{rgbToHex(aaColor)}</span>
        </div>
      </div>
      <div className="control-group">
        <label className="control-checkbox">
          <input
            type="checkbox"
            checked={diffMask}
            onChange={(e) => onDiffMaskChange(e.target.checked)}
          />
          差异蒙版模式
        </label>
        <div className="control-hint">在透明背景上绘制差异区域</div>
      </div>
    </div>
  )
}
