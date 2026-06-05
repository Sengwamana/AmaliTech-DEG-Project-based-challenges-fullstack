import { memo } from 'react'
import { useFileExplorer } from '../../context/FileExplorerContext'
import { TreeNodeIcon } from '../FileTree/TreeNodeIcon'
import { clsx } from '../../utils/formatters'

export const RecentFiles = memo(function RecentFiles() {
  const { recentFiles, selectFile, state } = useFileExplorer()

  if (recentFiles.length === 0) {
    return null
  }

  return (
    <div className="border-t border-surface-800/40">
      <div className="sidebar-section-header">
        <svg className="w-3.5 h-3.5 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <span className="sidebar-section-title">Recent Files</span>
        <div className="ml-auto text-2xs text-surface-600 font-medium">{recentFiles.length}</div>
      </div>

      <div className="px-1.5 pb-2 space-y-0.5">
        {recentFiles.map((file) => (
          <button
            key={file.id}
            onClick={() => selectFile(file.id)}
            className={clsx(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-sm',
              'transition-all duration-150 group',
              state.selectedFileId === file.id
                ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                : 'text-surface-500 hover:text-surface-300 hover:bg-surface-800/40 border border-transparent'
            )}
          >
            <TreeNodeIcon node={file} isExpanded={false} />
            <span className="truncate flex-1">{file.name}</span>
            {file.size && (
              <span className="text-2xs text-surface-600 shrink-0 font-mono">{file.size}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
})
