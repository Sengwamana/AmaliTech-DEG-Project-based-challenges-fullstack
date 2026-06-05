import { useFlowEditor } from '../../context/FlowEditorContext'
import { clsx } from '../common/utils'

export function Toolbar() {
  const { state, setMode, undo, redo, reset, canUndo, canRedo } = useFlowEditor()

  return (
    <header className="h-12 flex items-center gap-2 px-4 border-b border-surface-800/60 bg-surface-950/80 backdrop-blur-xl shrink-0">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center shadow-glow-sm">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h1 className="text-sm font-semibold text-surface-200 hidden sm:block">
          SupportFlow Builder
        </h1>
        <div className="hidden sm:block h-4 w-px bg-surface-700/60" />
        <span className="hidden sm:block text-2xs text-surface-500 font-medium">v1.0</span>
      </div>

      <div className="flex items-center border-l border-surface-800/40 ml-2 pl-2 gap-0.5">
        <ToolbarButton
          onClick={undo}
          disabled={!canUndo}
          label="Undo"
          shortcut="Ctrl+Z"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={redo}
          disabled={!canRedo}
          label="Redo"
          shortcut="Ctrl+Shift+Z"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
          </svg>
        </ToolbarButton>
      </div>

      <div className="flex items-center border-l border-surface-800/40 ml-2 pl-2 gap-1">
        <div className="flex rounded-lg bg-surface-850/60 border border-surface-800/40 p-0.5">
          <button
            onClick={() => setMode('edit')}
            className={clsx(
              'px-3 py-1 rounded-md text-xs font-medium transition-all duration-150',
              state.mode === 'edit'
                ? 'bg-surface-800 text-surface-200 shadow-sm'
                : 'text-surface-500 hover:text-surface-300'
            )}
            aria-pressed={state.mode === 'edit'}
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </span>
          </button>

          <button
            onClick={() => setMode('preview')}
            className={clsx(
              'px-3 py-1 rounded-md text-xs font-medium transition-all duration-150',
              state.mode === 'preview'
                ? 'bg-surface-800 text-surface-200 shadow-sm'
                : 'text-surface-500 hover:text-surface-300'
            )}
            aria-pressed={state.mode === 'preview'}
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Preview
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <ToolbarButton
          onClick={reset}
          label="Reset flow to defaults"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </ToolbarButton>
      </div>
    </header>
  )
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  label,
  shortcut,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  label: string
  shortcut?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'p-1.5 rounded-md transition-all duration-150',
        disabled
          ? 'text-surface-700 cursor-not-allowed'
          : 'text-surface-500 hover:text-surface-300 hover:bg-surface-800/60 active:text-surface-200'
      )}
      aria-label={shortcut ? `${label} (${shortcut})` : label}
      title={shortcut ? `${label} (${shortcut})` : label}
    >
      {children}
    </button>
  )
}
