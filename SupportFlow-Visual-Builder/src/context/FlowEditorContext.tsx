import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { FlowNode, EditorMode, HistoryEntry, FlowOption } from '../types'
import { getFlowData } from '../data/flowData'

interface FlowState {
  nodes: FlowNode[]
  mode: EditorMode
  selectedNodeId: string | null
  previewNodeId: string | null
  history: HistoryEntry[]
  historyIndex: number
}

type FlowAction =
  | { type: 'SELECT_NODE'; id: string | null }
  | { type: 'UPDATE_NODE_TEXT'; id: string; text: string }
  | { type: 'UPDATE_NODE_OPTIONS'; id: string; options: FlowOption[] }
  | { type: 'SET_MODE'; mode: EditorMode }
  | { type: 'SET_PREVIEW_NODE'; id: string | null }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET' }

interface FlowContextValue {
  state: FlowState
  selectNode: (id: string | null) => void
  updateNodeText: (id: string, text: string) => void
  updateNodeOptions: (id: string, options: FlowOption[]) => void
  setMode: (mode: EditorMode) => void
  setPreviewNode: (id: string | null) => void
  undo: () => void
  redo: () => void
  reset: () => void
  canUndo: boolean
  canRedo: boolean
}

const MAX_HISTORY = 50

function pushHistory(state: FlowState): FlowState {
  const newHistory = state.history.slice(0, state.historyIndex + 1)
  newHistory.push({ nodes: JSON.parse(JSON.stringify(state.nodes)) })
  if (newHistory.length > MAX_HISTORY) newHistory.shift()
  return { ...state, history: newHistory, historyIndex: newHistory.length - 1 }
}

const { nodes: initialNodes, canvasSize } = getFlowData()

function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'SELECT_NODE':
      return { ...state, selectedNodeId: action.id }

    case 'UPDATE_NODE_TEXT': {
      const next = pushHistory(state)
      next.nodes = next.nodes.map((n) =>
        n.id === action.id ? { ...n, text: action.text } : n
      )
      return next
    }

    case 'UPDATE_NODE_OPTIONS': {
      const next = pushHistory(state)
      next.nodes = next.nodes.map((n) =>
        n.id === action.id ? { ...n, options: action.options } : n
      )
      return next
    }

    case 'SET_MODE':
      return { ...state, mode: action.mode, previewNodeId: action.mode === 'preview' ? state.nodes.find(n => n.type === 'start')?.id ?? null : null }

    case 'SET_PREVIEW_NODE':
      return { ...state, previewNodeId: action.id }

    case 'UNDO': {
      if (state.historyIndex <= 0) return state
      const newIndex = state.historyIndex - 1
      const entry = state.history[newIndex]
      if (!entry) return state
      return { ...state, nodes: JSON.parse(JSON.stringify(entry.nodes)), historyIndex: newIndex }
    }

    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state
      const newIndex = state.historyIndex + 1
      const entry = state.history[newIndex]
      if (!entry) return state
      return { ...state, nodes: JSON.parse(JSON.stringify(entry.nodes)), historyIndex: newIndex }
    }

    case 'RESET':
      return buildInitialState()

    default:
      return state
  }
}

function buildInitialState(): FlowState {
  return {
    nodes: JSON.parse(JSON.stringify(initialNodes)),
    mode: 'edit',
    selectedNodeId: null,
    previewNodeId: null,
    history: [{ nodes: JSON.parse(JSON.stringify(initialNodes)) }],
    historyIndex: 0,
  }
}

const FlowContext = createContext<FlowContextValue | null>(null)

export function FlowEditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flowReducer, undefined, buildInitialState)

  const selectNode = useCallback((id: string | null) => dispatch({ type: 'SELECT_NODE', id }), [])
  const updateNodeText = useCallback((id: string, text: string) => dispatch({ type: 'UPDATE_NODE_TEXT', id, text }), [])
  const updateNodeOptions = useCallback((id: string, options: FlowOption[]) => dispatch({ type: 'UPDATE_NODE_OPTIONS', id, options }), [])
  const setMode = useCallback((mode: EditorMode) => dispatch({ type: 'SET_MODE', mode }), [])
  const setPreviewNode = useCallback((id: string | null) => dispatch({ type: 'SET_PREVIEW_NODE', id }), [])
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [])
  const redo = useCallback(() => dispatch({ type: 'REDO' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const canUndo = state.historyIndex > 0
  const canRedo = state.historyIndex < state.history.length - 1

  const value = useMemo(
    () => ({
      state,
      selectNode,
      updateNodeText,
      updateNodeOptions,
      setMode,
      setPreviewNode,
      undo,
      redo,
      reset,
      canUndo,
      canRedo,
    }),
    [state, selectNode, updateNodeText, updateNodeOptions, setMode, setPreviewNode, undo, redo, reset, canUndo, canRedo]
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlowEditor(): FlowContextValue {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlowEditor must be used within FlowEditorProvider')
  return ctx
}

export { canvasSize }
