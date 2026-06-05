import { useCallback } from 'react'
import { useFlowEditor } from '../../context/FlowEditorContext'
import { findNodeById, traverseFlow } from '../../utils/graphTraversal'
import { clsx } from '../common/utils'

export function PreviewMode() {
  const { state, setPreviewNode, setMode } = useFlowEditor()
  const currentNode = state.previewNodeId
    ? findNodeById(state.nodes, state.previewNodeId)
    : null

  const handleOptionClick = useCallback(
    (optionIndex: number) => {
      if (!state.previewNodeId) return
      const next = traverseFlow(state.nodes, state.previewNodeId, optionIndex)
      if (next) {
        setPreviewNode(next.id)
      }
    },
    [state.nodes, state.previewNodeId, setPreviewNode]
  )

  const handleRestart = useCallback(() => {
    const startNode = state.nodes.find((n) => n.type === 'start')
    if (startNode) setPreviewNode(startNode.id)
  }, [state.nodes, setPreviewNode])

  const handleExit = useCallback(() => {
    setMode('edit')
  }, [setMode])

  if (!currentNode) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-950">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-800/40 border border-surface-700/30 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-surface-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.75 3.75v-1.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v1.5m-4.5 0v1.5m0-1.5h-3a2.25 2.25 0 00-2.25 2.25v3m0 0h15m-15 0v9a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0021.75 15v-9" />
            </svg>
          </div>
          <p className="text-sm text-surface-500 font-medium">No flow data available</p>
          <button
            onClick={handleExit}
            className="mt-4 px-4 py-2 bg-surface-800/80 text-surface-300 rounded-xl text-sm hover:bg-surface-700/80 transition-all border border-surface-700/40"
          >
            Back to Editor
          </button>
        </div>
      </div>
    )
  }

  const isEndNode = currentNode.type === 'end'

  return (
    <div className="flex-1 flex flex-col bg-surface-950">
      <div className="px-4 py-2.5 bg-surface-900/80 backdrop-blur-xl border-b border-surface-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500/40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
          </span>
          <span className="text-xs font-semibold text-accent-400">Preview Mode</span>
          <span className="text-2xs text-surface-600 font-mono hidden sm:inline">Live Testing</span>
        </div>
        <button
          onClick={handleExit}
          className="px-3 py-1.5 text-xs text-surface-500 hover:text-surface-300 bg-surface-800/40 hover:bg-surface-700/60 rounded-lg transition-all border border-surface-700/30"
        >
          Exit Preview
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-surface-900/80 backdrop-blur-xl rounded-2xl border border-surface-800/60 shadow-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-surface-850/60 border-b border-surface-800/40 flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-danger-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-500/50" />
              </div>
              <svg className="w-3 h-3 text-surface-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-2xs text-surface-500 font-medium">SupportFlow Bot</span>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border',
                  currentNode.type === 'start' ? 'bg-accent-500/15 text-accent-400 border-accent-500/20' : '',
                  currentNode.type === 'question' ? 'bg-primary-500/15 text-primary-400 border-primary-500/20' : '',
                  currentNode.type === 'end' ? 'bg-surface-600/20 text-surface-400 border-surface-600/20' : ''
                )}>
                  {currentNode.type === 'start' ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  ) : currentNode.type === 'question' ? (
                    <span className="text-sm font-bold">?</span>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-surface-300">SupportFlow Assistant</p>
                    {isEndNode && (
                      <span className="px-1.5 py-0.5 rounded text-2xs font-semibold bg-surface-600/20 text-surface-400 border border-surface-600/20">
                        Ended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-surface-200 leading-relaxed">
                    {currentNode.text}
                  </p>
                </div>
              </div>

              {isEndNode ? (
                <div className="space-y-3">
                  <div className="px-4 py-3.5 rounded-xl bg-surface-850/60 border border-surface-800/40 text-center">
                    <p className="text-xs text-surface-500">This conversation has ended.</p>
                    <p className="text-2xs text-surface-600 mt-0.5">Thank you for using SupportFlow.</p>
                  </div>
                  <button
                    onClick={handleRestart}
                    className="w-full py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    Start Over
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentNode.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(i)}
                      className="w-full text-left px-4 py-3 bg-surface-850/60 hover:bg-surface-800/60
                                 border border-surface-800/40 hover:border-primary-500/30
                                 rounded-xl text-sm text-surface-300
                                 transition-all duration-150 active:scale-[0.99]
                                 focus-visible:ring-2 focus-visible:ring-primary-500/60 group"
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-surface-800/60 border border-surface-700/40 flex items-center justify-center text-2xs font-medium text-surface-500 group-hover:border-primary-500/30 group-hover:text-primary-400 transition-colors">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{option.label}</span>
                        </span>
                        <svg className="w-4 h-4 text-surface-600 group-hover:text-primary-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
