interface Props {
  diffCount: number
  totalPixels: number
}

export function DiffStats({ diffCount, totalPixels }: Props) {
  if (totalPixels === 0) return null

  const pct = ((diffCount / totalPixels) * 100).toFixed(2)

  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-value">{diffCount.toLocaleString()}</span>
        <span className="stat-label">差异像素</span>
      </div>
      <div className="stat">
        <span className="stat-value">{totalPixels.toLocaleString()}</span>
        <span className="stat-label">总像素</span>
      </div>
      <div className="stat">
        <span className="stat-value">{pct}%</span>
        <span className="stat-label">差异比例</span>
      </div>
    </div>
  )
}
