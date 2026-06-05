import { RecursiveTree } from '../FileTree/RecursiveTree'
import { RecentFiles } from '../RecentFiles/RecentFiles'

export function Sidebar() {
  return (
    <aside
      className="w-72 lg:w-80 border-r border-surface-800/60 bg-surface-900/40 flex flex-col overflow-hidden shrink-0"
      aria-label="File Explorer Sidebar"
    >
      <div className="sidebar-section-header border-b border-surface-800/40">
        <div className="w-5 h-5 rounded-md bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <span className="sidebar-section-title">File Explorer</span>
        <div className="ml-auto w-1 h-1 rounded-full bg-surface-600/40" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-1.5 px-1.5">
        <RecursiveTree />
      </div>

      <RecentFiles />
    </aside>
  )
}
