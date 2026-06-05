import { SearchBar } from '../Search/SearchBar'

export function Header() {
  return (
    <header className="h-14 flex items-center gap-4 px-5 border-b border-surface-800/60 bg-surface-950/80 backdrop-blur-xl shadow-sm shrink-0">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center shadow-glow-sm">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-surface-200 leading-tight">SecureVault</h1>
          <p className="text-2xs text-surface-500 font-medium tracking-wide">Enterprise File Explorer</p>
        </div>
      </div>

      <SearchBar />

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface-850/60 border border-surface-800/40 text-2xs text-surface-500">
          <kbd className="shadow-none bg-surface-800/60 border-surface-700/40 text-surface-400">Ctrl+K</kbd>
          <span className="hidden sm:inline">Search</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-surface-700/50 flex items-center justify-center ring-1 ring-surface-700/30">
          <span className="text-xs font-semibold text-primary-400">SV</span>
        </div>
      </div>
    </header>
  )
}
