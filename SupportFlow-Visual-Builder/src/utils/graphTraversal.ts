import type { FlowNode } from '../types'

export function findNodeById(nodes: FlowNode[], id: string): FlowNode | undefined {
  return nodes.find((n) => n.id === id)
}

export function findParentNode(nodes: FlowNode[], childId: string): FlowNode | undefined {
  return nodes.find((n) => n.options.some((o) => o.nextId === childId))
}

export function getNodeColor(type: FlowNode['type']): string {
  switch (type) {
    case 'start':
      return 'accent'
    case 'question':
      return 'primary'
    case 'end':
      return 'surface'
  }
}

export interface ConnectorLine {
  from: { x: number; y: number }
  to: { x: number; y: number }
  label: string
  fromId: string
  toId: string
}

export function computeConnectors(
  nodes: FlowNode[],
  nodeWidth: number,
  nodeHeight: number
): ConnectorLine[] {
  const lines: ConnectorLine[] = []

  for (const node of nodes) {
    for (const option of node.options) {
      const target = findNodeById(nodes, option.nextId)
      if (!target) continue

      lines.push({
        from: {
          x: node.position.x + nodeWidth / 2,
          y: node.position.y + nodeHeight,
        },
        to: {
          x: target.position.x + nodeWidth / 2,
          y: target.position.y,
        },
        label: option.label,
        fromId: node.id,
        toId: target.id,
      })
    }
  }

  return lines
}

export function traverseFlow(
  nodes: FlowNode[],
  currentNodeId: string,
  optionIndex: number
): FlowNode | null {
  const current = findNodeById(nodes, currentNodeId)
  if (!current) return null

  const option = current.options[optionIndex]
  if (!option) return null

  return findNodeById(nodes, option.nextId) ?? null
}
