import type { FileNode } from '../types'
import rawData from '../../data.json'

export function getFileTree(): FileNode[] {
  return rawData as FileNode[]
}

export function flattenTree(
  nodes: FileNode[],
  expandedIds: Set<string>,
  depth = 0,
  parentIds: string[] = []
): Array<{ node: FileNode; depth: number; isExpanded: boolean; parentIds: string[] }> {
  const result: Array<{ node: FileNode; depth: number; isExpanded: boolean; parentIds: string[] }> = []

  for (const node of nodes) {
    const isExpanded = expandedIds.has(node.id)
    result.push({ node, depth, isExpanded, parentIds })

    if (node.type === 'folder' && isExpanded && node.children) {
      result.push(...flattenTree(node.children, expandedIds, depth + 1, [...parentIds, node.id]))
    }
  }

  return result
}

export interface SearchMatch {
  node: FileNode
  parentIds: string[]
}

export function searchTree(
  nodes: FileNode[],
  query: string,
  parentIds: string[] = []
): SearchMatch[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  const results: SearchMatch[] = []

  for (const node of nodes) {
    const currentParentIds = [...parentIds]
    const nameMatches = node.name.toLowerCase().includes(lowerQuery)

    if (nameMatches) {
      results.push({ node, parentIds: currentParentIds })
    }

    if (node.type === 'folder' && node.children) {
      const childResults = searchTree(node.children, query, [...currentParentIds, node.id])
      results.push(...childResults)
    }
  }

  return results
}

export function findNodeById(
  nodes: FileNode[],
  id: string
): FileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.type === 'folder' && node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

export function getFileTypeLabel(node: FileNode): string {
  if (node.type === 'folder') return 'Folder'
  const ext = node.name.split('.').pop()?.toUpperCase() ?? ''
  return `${ext} File`
}

export function formatSize(size: string | undefined): string {
  if (!size) return '—'
  return size
}
