import { useRef, useMemo } from 'react'
import { useFileExplorer } from '../../context/FileExplorerContext'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import { TreeNode } from './TreeNode'

export function RecursiveTree() {
  const { state } = useFileExplorer()
  const treeRef = useRef<HTMLUListElement>(null)
  useKeyboardNavigation(treeRef)

  const filteredTree = useMemo(() => {
    if (!state.searchQuery) return state.tree
    const query = state.searchQuery.toLowerCase()
    const filterNodes = (nodes: typeof state.tree): typeof state.tree => {
      return nodes.filter((node) => {
        const nameMatch = node.name.toLowerCase().includes(query)
        if (node.type === 'folder' && node.children) {
          const filteredChildren = filterNodes(node.children)
          return nameMatch || filteredChildren.length > 0
        }
        return nameMatch
      })
    }
    return filterNodes(state.tree)
  }, [state.tree, state.searchQuery])

  if (filteredTree.length === 0 && state.searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
        <div className="w-10 h-10 rounded-xl bg-surface-800/40 border border-surface-700/30 flex items-center justify-center mb-3">
          <svg className="w-5 h-5 text-surface-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <p className="text-sm text-surface-500 font-medium">No results found</p>
        <p className="text-xs text-surface-600 mt-1">
          &ldquo;{state.searchQuery}&rdquo; doesn&apos;t match any files
        </p>
      </div>
    )
  }

  return (
    <ul
      ref={treeRef}
      role="tree"
      aria-label="File Explorer"
      className="space-y-0.5"
    >
      {filteredTree.map((node) => (
        <TreeNode key={node.id} node={node} depth={0} />
      ))}
    </ul>
  )
}
