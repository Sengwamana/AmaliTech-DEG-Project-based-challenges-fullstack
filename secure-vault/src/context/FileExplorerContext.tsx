import { createContext, useContext, useCallback, useMemo, useReducer, type ReactNode } from 'react'
import type { FileNode } from '../types'
import { getFileTree, flattenTree, searchTree, findNodeById } from '../data/fileData'

interface FileState {
  tree: FileNode[]
  selectedFileId: string | null
  expandedFolderIds: Set<string>
  recentFileIds: string[]
  searchQuery: string
}

type FileAction =
  | { type: 'SELECT_FILE'; id: string }
  | { type: 'TOGGLE_FOLDER'; id: string }
  | { type: 'EXPAND_FOLDER'; id: string }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'CLEAR_SEARCH' }

interface FileContextValue {
  state: FileState
  selectFile: (id: string) => void
  toggleFolder: (id: string) => void
  expandFolder: (id: string) => void
  setSearchQuery: (query: string) => void
  clearSearch: () => void
  flatList: ReturnType<typeof flattenTree>
  selectedFile: FileNode | null
  searchResults: ReturnType<typeof searchTree>
  recentFiles: FileNode[]
}

const RECENT_MAX = 5

function fileReducer(state: FileState, action: FileAction): FileState {
  switch (action.type) {
    case 'SELECT_FILE': {
      const node = findNodeById(state.tree, action.id)
      if (!node || node.type === 'folder') return state

      const recentFileIds = state.recentFileIds.filter((rid) => rid !== action.id)
      recentFileIds.unshift(action.id)
      if (recentFileIds.length > RECENT_MAX) recentFileIds.pop()

      return { ...state, selectedFileId: action.id, recentFileIds }
    }
    case 'TOGGLE_FOLDER': {
      const next = new Set(state.expandedFolderIds)
      if (next.has(action.id)) {
        next.delete(action.id)
      } else {
        next.add(action.id)
      }
      return { ...state, expandedFolderIds: next }
    }
    case 'EXPAND_FOLDER': {
      const next = new Set(state.expandedFolderIds)
      next.add(action.id)
      return { ...state, expandedFolderIds: next }
    }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query }
    case 'CLEAR_SEARCH':
      return { ...state, searchQuery: '' }
    default:
      return state
  }
}

function buildInitialState(): FileState {
  return {
    tree: getFileTree(),
    selectedFileId: null,
    expandedFolderIds: new Set(),
    recentFileIds: [],
    searchQuery: '',
  }
}

const FileContext = createContext<FileContextValue | null>(null)

export function FileExplorerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(fileReducer, undefined, buildInitialState)

  const selectFile = useCallback((id: string) => dispatch({ type: 'SELECT_FILE', id }), [])
  const toggleFolder = useCallback((id: string) => dispatch({ type: 'TOGGLE_FOLDER', id }), [])
  const expandFolder = useCallback((id: string) => dispatch({ type: 'EXPAND_FOLDER', id }), [])
  const setSearchQuery = useCallback((query: string) => dispatch({ type: 'SET_SEARCH', query }), [])
  const clearSearch = useCallback(() => dispatch({ type: 'CLEAR_SEARCH' }), [])

  const flatList = useMemo(
    () => flattenTree(state.tree, state.expandedFolderIds),
    [state.tree, state.expandedFolderIds]
  )

  const selectedFile = useMemo(
    () => (state.selectedFileId ? findNodeById(state.tree, state.selectedFileId) : null),
    [state.tree, state.selectedFileId]
  )

  const searchResults = useMemo(
    () => searchTree(state.tree, state.searchQuery),
    [state.tree, state.searchQuery]
  )

  const recentFiles = useMemo(
    () =>
      state.recentFileIds
        .map((id) => findNodeById(state.tree, id))
        .filter((n): n is FileNode => n !== null),
    [state.tree, state.recentFileIds]
  )

  const value = useMemo(
    () => ({
      state,
      selectFile,
      toggleFolder,
      expandFolder,
      setSearchQuery,
      clearSearch,
      flatList,
      selectedFile,
      searchResults,
      recentFiles,
    }),
    [
      state,
      selectFile,
      toggleFolder,
      expandFolder,
      setSearchQuery,
      clearSearch,
      flatList,
      selectedFile,
      searchResults,
      recentFiles,
    ]
  )

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>
}

export function useFileExplorer(): FileContextValue {
  const ctx = useContext(FileContext)
  if (!ctx) throw new Error('useFileExplorer must be used within FileExplorerProvider')
  return ctx
}
