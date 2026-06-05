import { useEffect, useCallback, useRef } from 'react'
import { useFileExplorer } from '../context/FileExplorerContext'

export function useKeyboardNavigation(treeRef: React.RefObject<HTMLUListElement | null>) {
  const { flatList, selectFile, toggleFolder, state } = useFileExplorer()
  const focusIndexRef = useRef(-1)

  const getVisibleFlatList = useCallback(() => {
    return flatList.filter((item) => {
      if (!state.searchQuery) return true
      return item.node.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    })
  }, [flatList, state.searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const visible = getVisibleFlatList()
      if (visible.length === 0) return

      const treeEl = treeRef.current
      if (!treeEl) return

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          focusIndexRef.current = Math.min(focusIndexRef.current + 1, visible.length - 1)
          focusItem(visible[focusIndexRef.current]!.node.id)
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          focusIndexRef.current = Math.max(focusIndexRef.current - 1, 0)
          focusItem(visible[focusIndexRef.current]!.node.id)
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          const current = visible[focusIndexRef.current]
          if (current?.node.type === 'folder') {
            toggleFolder(current.node.id)
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          const current = visible[focusIndexRef.current]
          if (current?.node.type === 'folder' && state.expandedFolderIds.has(current.node.id)) {
            toggleFolder(current.node.id)
          }
          break
        }
        case 'Enter': {
          e.preventDefault()
          const current = visible[focusIndexRef.current]
          if (current) {
            if (current.node.type === 'folder') {
              toggleFolder(current.node.id)
            } else {
              selectFile(current.node.id)
            }
          }
          break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [getVisibleFlatList, selectFile, toggleFolder, state.expandedFolderIds, treeRef])

  const focusItem = (id: string) => {
    const el = treeRef.current?.querySelector(`[data-node-id="${id}"]`) as HTMLElement
    el?.focus()
  }

  const resetFocusIndex = useCallback(() => {
    focusIndexRef.current = -1
  }, [])

  return { resetFocusIndex }
}
