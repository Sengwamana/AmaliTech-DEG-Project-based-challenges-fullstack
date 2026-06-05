import { useCallback, useRef, useEffect } from 'react'
import { useFlowEditor } from '../../context/FlowEditorContext'
import { findNodeById } from '../../utils/graphTraversal'
import { clsx } from '../common/utils'

export function NodeEditor() {
  const { state, updateNodeText, selectNode } = useFlowEditor()
  const selectedNode = state.selectedNodeId
    ? findNodeById(state.nodes, state.selectedNodeId)
    : null

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (selectedNode && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [state.selectedNodeId])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (state.selectedNodeId) {
        updateNodeText(state.selectedNodeId, e.target.value)
      }
    },
    [state.selectedNodeId, updateNodeText]
  )

  const typeColors: Record<string, string> = {
    start: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
    question: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    end: 'bg-surface-600/20 text-surface-400 border-surface-600/20',
  }

  if (!selectedNode) {
    return (
      <aside className="w-72 border-l border-surface-800/60 bg-surface-900/30 flex flex-col shrink-0">
        <div className="sidebar-section-header border-b border-surface-800/40">
          <div className="w-5 h-5 rounded-md bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-2xs font-semibold uppercase tracking-[0.08em] text-surface-500">
            Node Editor
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="text-surface-500">
            <div className="w-10 h-10 rounded-xl bg-surface-800/40 border border-surface-700/30 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-surface-500">No node selected</p>
            <p className="text-xs text-surface-600 mt-1 max-w-[160px] mx-auto">
              Click any node on the canvas to edit its content
            </p>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-72 border-l border-surface-800/60 bg-surface-900/30 flex flex-col shrink-0">
      <div className="sidebar-section-header border-b border-surface-800/40">
        <div className="w-5 h-5 rounded-md bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <span className="text-2xs font-semibold uppercase tracking-[0.08em] text-surface-500">
          Editor
        </span>
        <button
          onClick={() => selectNode(null)}
          className="ml-auto p-1 rounded-md text-surface-600 hover:text-surface-300 hover:bg-surface-800/60 transition-all"
          aria-label="Close editor"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <div className="panel-card p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className={clsx(
              'px-2 py-0.5 rounded-md text-2xs font-semibold uppercase tracking-wider border',
              typeColors[selectedNode.type]
            )}>
              {selectedNode.type}
            </span>
            <span className="text-2xs font-mono text-surface-600">ID: {selectedNode.id}</span>
          </div>
        </div>

        <div>
          <label className="block text-2xs font-semibold uppercase tracking-[0.08em] text-surface-500 mb-1.5">
            Question Text
          </label>
          <textarea
            ref={textareaRef}
            value={selectedNode.text}
            onChange={handleTextChange}
            rows={4}
            className={clsx(
              'w-full px-3 py-2 bg-surface-850/80 border rounded-xl resize-none',
              'text-sm text-surface-200 placeholder-surface-500',
              'transition-all duration-200',
              'focus:outline-none focus:border-primary-500/40 focus:ring-1 focus:ring-primary-500/20',
              'hover:border-surface-600/60',
              'border-surface-700/60'
            )}
            aria-label="Edit node text"
          />
        </div>

        {selectedNode.options.length > 0 && (
          <div>
            <label className="block text-2xs font-semibold uppercase tracking-[0.08em] text-surface-500 mb-1.5">
              Options ({selectedNode.options.length})
            </label>
            <div className="space-y-1.5">
              {selectedNode.options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-surface-850/40 rounded-xl border border-surface-800/40"
                >
                  <span className="w-5 h-5 rounded-md bg-surface-800/60 border border-surface-700/40 flex items-center justify-center text-2xs font-medium text-surface-500 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-surface-300 truncate font-medium">{opt.label}</p>
                    <p className="text-2xs text-surface-600 mt-0.5">→ Node {opt.nextId}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedNode.type === 'end' && (
          <div className="px-3.5 py-2.5 rounded-xl bg-surface-850/40 border border-surface-800/40">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-surface-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <p className="text-xs text-surface-400">
                End nodes terminate the conversation flow. No options can be added.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
