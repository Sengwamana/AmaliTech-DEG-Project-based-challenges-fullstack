export interface FlowMeta {
  theme: string
  canvas_size: { w: number; h: number }
}

export interface FlowOption {
  label: string
  nextId: string
}

export interface FlowNode {
  id: string
  type: 'start' | 'question' | 'end'
  text: string
  position: { x: number; y: number }
  options: FlowOption[]
}

export interface FlowData {
  meta: FlowMeta
  nodes: FlowNode[]
}

export type EditorMode = 'edit' | 'preview'

export interface HistoryEntry {
  nodes: FlowNode[]
}
