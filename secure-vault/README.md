# SecureVault Explorer

> Enterprise-grade file management dashboard for SecureVault Inc. — a cloud security platform serving law firms and financial institutions.

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4)

---

## Overview

SecureVault Explorer replaces a flat, hard-to-navigate file list with a modern recursive file tree. Built for power users who manage thousands of deeply nested legal and financial documents, it combines keyboard-first navigation with real-time search and intelligent file recall.

**Business value:** Lawyers and bank employees switch between case files dozens of times per day. The Recent Files wildcard feature reduces this to a single click.

---

## Features

### Recursive File Tree
Renders arbitrarily nested folder structures using a recursive `TreeNode` component. Each `TreeNode` renders itself, then maps over `node.children` to render child nodes. Depth is tracked via a `depth` prop driving left-padding indentation. Expansion state lives in a `Set<string>` within React context for O(1) lookups.

- Unlimited nesting depth
- Smooth expand/collapse animations
- Visual indentation per level
- Empty folder indicators

### Keyboard Accessibility
Full tree navigation without touching the mouse:

| Key | Action |
|---|---|
| `↑` / `↓` | Move focus between visible items |
| `→` | Expand folder |
| `←` | Collapse folder |
| `Enter` / `Space` | Select file or toggle folder |

Implements WAI-ARIA `tree` / `treeitem` roles with `aria-expanded`, `aria-selected`, and programmatic focus management via `useKeyboardNavigation`.

### Properties Panel
Click any file to display metadata:
- Name, type (derived from extension), size, and internal ID
- Visual selected state with left accent border
- Card-based layout with glass surface styling

### Real-Time Search
Depth-first recursive search across the entire tree:
- Expands parent folders of matching results automatically
- Filters tree view as you type
- Shows result count badge in the search bar
- Empty state with query feedback

### Recent Files (Wildcard)
Tracks the last 5 selected files using LRU eviction. Displayed as a dedicated panel in the sidebar. Chosen specifically for SecureVault's core users — legal and banking professionals who frequently revisit recently viewed documents throughout the day.

---

## Architecture

```
secure-vault/
├── index.html                  # Entry point
├── data.json                   # File tree data (unchanged)
├── tailwind.config.js          # Design tokens
├── src/
│   ├── App.tsx                 # Root layout (Header + Sidebar + Main + Properties)
│   ├── main.tsx                # React entry
│   ├── index.css               # Base styles + component utilities
│   ├── types/
│   │   └── index.ts            # FileNode, FlatNode, FileState
│   ├── data/
│   │   └── fileData.ts         # Tree utilities, search, flatten, lookup
│   ├── context/
│   │   └── FileExplorerContext.tsx  # Global state via useReducer
│   ├── hooks/
│   │   └── useKeyboardNavigation.ts # Arrow keys + Enter handling
│   ├── utils/
│   │   └── formatters.ts       # clsx helper
│   └── components/
│       ├── FileTree/            # TreeNode (recursive), TreeNodeIcon, RecursiveTree
│       ├── Layout/              # Header, Sidebar, PropertiesPanel
│       ├── Search/              # SearchBar
│       └── RecentFiles/         # RecentFiles panel
```

### State Management

All application state lives in a single `useReducer` within `FileExplorerContext`:

```typescript
interface FileState {
  tree: FileNode[]           // Immutable source data
  selectedFileId: string | null
  expandedFolderIds: Set<string>  // O(1) lookups
  recentFileIds: string[]         // LRU list, max 5
  searchQuery: string
}
```

Derived values (flatList, selectedFile, searchResults, recentFiles) are computed via `useMemo` and only recalculated when their dependencies change.

---

## Design System

A premium dark-mode system inspired by Linear, Vercel, and Cloudflare dashboards.

### Color Tokens

| Token | Base | Usage |
|---|---|---|
| `surface-950` | `#090b14` | Primary background |
| `surface-900` | `#111624` | Elevated surfaces |
| `surface-850` | `#1a2032` | Input backgrounds, intermediate depth |
| `surface-800` | `#232a3e` | Borders, subtle surfaces |
| `primary-500` | `#4c6ef5` | Interactive elements, focus rings |
| `accent-500` | `#20c997` | Success states, recent files |
| `danger-500` | `#ff6b6b` | Destructive actions |
| `warning-500` | `#fcc419` | Highlights, cautions |

### Typography

- **UI:** Inter (400/500/600 weights)
- **Code:** JetBrains Mono (for IDs, sizes, keyboard shortcuts)
- **Scale:** 10px (`2xs`) → 20px (`2xl`) with tuned line-heights

### Shadows

Multi-layered shadow system for dark-mode depth:
- `shadow-xs` through `shadow-xl` — increasing blur and opacity
- `shadow-glow-sm` / `shadow-glow` — primary brand glow for selected/focused elements
- `shadow-card` — layered card shadow (ambient + highlight)

### Component States

Every interactive component defines: `default` → `hover` → `active` → `focus-visible` → `selected`.

### Design File

> [View Design System in Penpot](https://penpot.app) — Open the `SecureVault-Dashboard` project for full design frames including typography scale, color palette, spacing grid, and component states.
>
> Full design specifications for every component, state, and variant are documented in [`DESIGN.md`](./DESIGN.md). Use these specs to recreate the design in Penpot or Figma.
>
> **Important:** Ensure the design file is shared with **"Anyone with the link can view"** permission, then replace the placeholder link above with the actual share URL.

---

## Deployment

Deploy to Vercel (recommended):

```bash
npm install -g vercel
vercel --prod
```

Or build and serve statically:

```bash
npm run build
# deploy dist/ to any static host (Netlify, GitHub Pages, Cloudflare Pages)
```

---

## Setup

```bash
# Clone the repository
git clone https://github.com/Sengwamana/AmaliTech-DEG-Project-based-challenges-fullstack.git
cd fullstack/secure-vault

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The dev server starts at `http://localhost:5173` by default.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5.6 (strict mode) |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| State | React Context + useReducer |
| Accessibility | WAI-ARIA tree pattern |
| Design | Custom tokens, no component libraries |

---

## License

MIT — see [LICENSE](./LICENSE).
