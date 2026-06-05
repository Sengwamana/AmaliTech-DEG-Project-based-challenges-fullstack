import { useFileExplorer } from '../../context/FileExplorerContext'
import { getFileTypeLabel } from '../../data/fileData'

export function PropertiesPanel() {
  const { selectedFile } = useFileExplorer()

  return (
    <aside
      className="w-64 lg:w-72 border-l border-surface-800/60 bg-surface-900/30 flex flex-col overflow-hidden shrink-0"
      aria-label="Properties Panel"
    >
      <div className="sidebar-section-header border-b border-surface-800/40">
        <div className="w-5 h-5 rounded-md bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="sidebar-section-title">Properties</span>
      </div>

      <div className="flex-1 p-3">
        {selectedFile ? (
          <div className="animate-fade-in-up space-y-4">
            <div className="panel-card p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-surface-200 truncate leading-tight">
                    {selectedFile.name}
                  </p>
                  <p className="text-2xs text-surface-500 font-mono mt-0.5">{selectedFile.id}</p>
                </div>
              </div>
            </div>

            <div className="panel-card divide-y divide-surface-800/40">
              <PropertyRow label="Name" value={selectedFile.name} mono={false} />
              <PropertyRow label="Type" value={getFileTypeLabel(selectedFile)} mono={false} />
              <PropertyRow label="Size" value={selectedFile.size ?? '—'} mono={true} />
              <PropertyRow label="ID" value={selectedFile.id} mono={true} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-12 h-12 rounded-xl bg-surface-800/40 border border-surface-700/30 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-surface-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-sm text-surface-500 font-medium">No file selected</p>
            <p className="text-xs text-surface-600 mt-1 max-w-[180px]">
              Click any file in the explorer to view its properties
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}

function PropertyRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="px-3 py-2.5">
      <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-surface-500 mb-0.5">
        {label}
      </p>
      <p className={`
        text-sm text-surface-200 break-all
        ${mono ? 'font-mono text-xs text-surface-300' : ''}
      `}>
        {value}
      </p>
    </div>
  )
}
