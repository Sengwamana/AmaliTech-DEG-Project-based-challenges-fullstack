import type { FlowNode } from '../types'
import rawData from '../../flow_data.json'

export function getFlowData(): { nodes: FlowNode[]; canvasSize: { w: number; h: number } } {
  const data = rawData as { meta: { canvas_size: { w: number; h: number } }; nodes: FlowNode[] }
  return {
    nodes: data.nodes,
    canvasSize: data.meta.canvas_size,
  }
}
