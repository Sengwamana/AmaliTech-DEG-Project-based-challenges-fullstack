export function computeBezierPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  const dy = Math.abs(y2 - y1)
  const cpOffset = Math.max(dy * 0.4, 40)

  return `M ${x1} ${y1} C ${x1} ${y1 + cpOffset}, ${x2} ${y2 - cpOffset}, ${x2} ${y2}`
}

export interface ConnectorData {
  path: string
  label: string
  labelX: number
  labelY: number
}
