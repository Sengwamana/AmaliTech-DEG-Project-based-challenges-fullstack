export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  size?: string
}

export interface FlatNode {
  node: FileNode
  depth: number
  isExpanded: boolean
  isVisible: boolean
  parentIds: string[]
}

export type SortBy = 'name' | 'type' | 'size'
export type SortOrder = 'asc' | 'desc'

export interface FileState {
  tree: FileNode[]
  selectedFileId: string | null
  expandedFolderIds: Set<string>
  recentFileIds: string[]
  searchQuery: string
}
