import type { FileNode } from '../../types'
import { clsx } from '../../utils/formatters'

interface TreeNodeIconProps {
  node: FileNode
  isExpanded: boolean
}

const iconPaths = {
  folder: (
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  ),
  folderOpen: (
    <path d="M2 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1H8.414a1 1 0 00-.707.293l-1.5 1.5A1 1 0 015.586 13H2V7z" />
  ),
  file: (
    <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6.414A2 2 0 0013.414 5L11 2.586A2 2 0 009.586 2H4zm1 3a1 1 0 011-1h2a1 1 0 010 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H6a1 1 0 01-1-1z" />
  ),
  image: (
    <path d="M4.75 4A1.75 1.75 0 003 5.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0015 14.25v-8.5A1.75 1.75 0 0013.25 4h-8.5zM7 7.5A1.5 1.5 0 117 10.5 1.5 1.5 0 017 7.5zm5 5.5l-3-4-2 3-1-1.5-2 2.5h8z" />
  ),
  code: (
    <path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z" />
  ),
  spreadsheet: (
    <path d="M3.75 0a1.75 1.75 0 00-1.75 1.75v12.5c0 .966.784 1.75 1.75 1.75h8.5a1.75 1.75 0 001.75-1.75V1.75A1.75 1.75 0 0012.25 0h-8.5zM5 7.5h2V5H5v2.5zm0 2.5h2v-2H5v2zm3-2.5h2V5H8v2.5zm0 2.5h2v-2H8v2z" />
  ),
  document: (
    <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6.414A2 2 0 0013.414 5L11 2.586A2 2 0 009.586 2H4zm1 8a1 1 0 011-1h4a1 1 0 010 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 010 2H6a1 1 0 01-1-1z" />
  ),
  text: (
    <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6.414A2 2 0 0013.414 5L11 2.586A2 2 0 009.586 2H4zm1 3a1 1 0 011-1h2a1 1 0 010 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 010 2H6a1 1 0 01-1-1z" />
  ),
}

function getIconType(node: FileNode): keyof typeof iconPaths {
  if (node.type === 'folder') return 'folder'
  const ext = node.name.split('.').pop()?.toLowerCase() ?? ''
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) return 'image'
  if (['js', 'ts', 'tsx', 'jsx', 'py', 'rb', 'go', 'rs', 'yaml', 'yml', 'json', 'xml'].includes(ext))
    return 'code'
  if (['xlsx', 'xls', 'csv'].includes(ext)) return 'spreadsheet'
  if (['doc', 'docx', 'pdf'].includes(ext)) return 'document'
  if (['txt', 'md', 'log'].includes(ext)) return 'text'
  return 'file'
}

const fileTypeColors: Record<string, string> = {
  folder: 'text-primary-400',
  folderOpen: 'text-warning-400',
  image: 'text-accent-400',
  code: 'text-primary-400',
  spreadsheet: 'text-accent-400',
  document: 'text-danger-400',
  text: 'text-surface-400',
  file: 'text-surface-500',
}

export function TreeNodeIcon({ node, isExpanded }: TreeNodeIconProps) {
  const iconType = getIconType(node)

  const colorClass = node.type === 'folder'
    ? isExpanded ? 'text-warning-400' : 'text-primary-400'
    : fileTypeColors[iconType] ?? 'text-surface-500'

  return (
    <svg
      className={clsx('w-4 h-4 shrink-0', colorClass)}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      {node.type === 'folder' && isExpanded ? iconPaths.folderOpen : iconPaths[iconType]}
    </svg>
  )
}
