import { useRef, useEffect, useState } from 'react'
import { useFileExplorer } from '../../context/FileExplorerContext'

export function SearchBar() {
  const { state, setSearchQuery, clearSearch, expandFolder, searchResults } = useFileExplorer()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (searchResults.length > 0) {
      const allParentIds = new Set(
        searchResults.flatMap((r) => r.parentIds)
      )
      allParentIds.forEach((pid) => expandFolder(pid))
    }
  }, [searchResults, expandFolder])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleClear = () => {
    clearSearch()
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex-1 max-w-md group">
      <div className={`
        absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none
        transition-colors duration-200
        ${isFocused ? 'text-primary-400' : 'text-surface-500'}
      `}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={state.searchQuery}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search files and folders..."
        aria-label="Search files and folders"
        className="w-full pl-10 pr-9 py-2
                   bg-surface-850/80 border
                   text-surface-200 text-sm placeholder-surface-500
                   rounded-xl
                   transition-all duration-200
                   focus:outline-none focus:border-primary-500/40 focus:ring-1 focus:ring-primary-500/20
                   group-hover:border-surface-600/60
                   ${isFocused
                     ? 'border-primary-500/40 shadow-glow-sm bg-surface-850'
                     : 'border-surface-700/60'
                   }"
      />

      {state.searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg
                     text-surface-500 hover:text-surface-300 hover:bg-surface-700/50
                     transition-all duration-150"
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {state.searchQuery && searchResults.length > 0 && (
        <div className="absolute right-9 top-1/2 -translate-y-1/2 text-2xs text-surface-500 font-medium pointer-events-none">
          {searchResults.length}
        </div>
      )}
    </div>
  )
}
