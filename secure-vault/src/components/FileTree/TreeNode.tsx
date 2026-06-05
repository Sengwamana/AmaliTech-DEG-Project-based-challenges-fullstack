import { memo, useCallback } from 'react'
import type { FileNode } from '../../types'
import { useFileExplorer } from '../../context/FileExplorerContext'
import { clsx } from '../../utils/formatters'
import { TreeNodeIcon } from './TreeNodeIcon'

interface TreeNodeProps {
  node: FileNode
  depth: number
}

export const TreeNode = memo(function TreeNode({ node, depth }: TreeNodeProps) {
  const { state, selectFile, toggleFolder } = useFileExplorer()
  const isExpanded = state.expandedFolderIds.has(node.id)
  const isSelected = state.selectedFileId === node.id
  const isFolder = node.type === 'folder'

  const handleClick = useCallback(() => {
    if (isFolder) {
      toggleFolder(node.id)
    } else {
      selectFile(node.id)
    }
  }, [isFolder, node.id, toggleFolder, selectFile])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  return (
    <li role="treeitem" aria-expanded={isFolder ? isExpanded : undefined} aria-selected={isSelected}>
      <div
        data-node-id={node.id}
        role="button"
        tabIndex={0}
        className={clsx(
          'file-row relative group',
          isSelected
            ? 'file-row-selected'
            : 'file-row-hover text-surface-400',
          isSelected && 'accent-left-border active'
        )}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {depth > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-surface-800/40"
            style={{ left: `${8 + (depth - 1) * 16 + 7}px` }}
            aria-hidden="true"
          />
        )}

        <TreeNodeIcon node={node} isExpanded={isExpanded} />

        <span className={clsx(
          'truncate flex-1 text-sm',
          isSelected ? 'text-primary-200 font-medium' : 'group-hover:text-surface-200'
        )}>
          {node.name}
        </span>

        {isFolder && (
          <svg
            className={clsx(
              'w-3 h-3 text-surface-600 transition-all duration-200',
              isExpanded && 'rotate-90 text-primary-400'
            )}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.22 4.72a.75.75 0 011.06 0l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06-1.06L9.19 8.5 6.22 5.78a.75.75 0 010-1.06z" />
          </svg>
        )}
      </div>

      {isFolder && isExpanded && node.children && (
        <ul role="group" className="animate-fade-in">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
          {node.children.length === 0 && (
            <li
              className="text-surface-600 text-xs italic px-3 py-1.5 select-none"
              style={{ paddingLeft: `${24 + (depth + 1) * 16}px` }}
            >
              Empty folder
            </li>
          )}
        </ul>
      )}
    </li>
  )
})
