import { FileExplorerProvider } from './context/FileExplorerContext'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { PropertiesPanel } from './components/Layout/PropertiesPanel'

export default function App() {
  return (
    <FileExplorerProvider>
      <div className="h-screen flex flex-col bg-surface-950">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 flex items-center justify-center bg-surface-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(76,110,245,0.03),transparent_60%)] pointer-events-none" />

            <div className="text-center max-w-md relative">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-surface-900 border border-primary-500/20 flex items-center justify-center shadow-glow-sm">
                <svg className="w-10 h-10 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-surface-300 mb-1.5">
                Welcome to SecureVault
              </h2>
              <p className="text-sm text-surface-500 leading-relaxed max-w-sm mx-auto">
                Browse your encrypted files from the sidebar. Use the search bar to locate documents across all nested folders.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 text-2xs text-surface-600">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-900/60 border border-surface-800/40">
                  <kbd className="shadow-none bg-surface-800/60 border-surface-700/40 text-surface-400">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-900/60 border border-surface-800/40">
                  <kbd className="shadow-none bg-surface-800/60 border-surface-700/40 text-surface-400">→</kbd>
                  Expand
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-900/60 border border-surface-800/40">
                  <kbd className="shadow-none bg-surface-800/60 border-surface-700/40 text-surface-400">Enter</kbd>
                  Select
                </span>
              </div>
            </div>
          </main>

          <PropertiesPanel />
        </div>
      </div>
    </FileExplorerProvider>
  )
}
