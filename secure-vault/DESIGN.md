# SecureVault Explorer — Design System

> Use this document to recreate the design in Penpot or Figma.  
> **Share the design file with "Anyone with the link can view" permission.**

---

## 1. Canvas & Artboards

| Artboard | Size | Description |
|---|---|---|
| App Shell | 1440 × 900 | Full layout with sidebar, main area, properties panel |
| Header | 1440 × 56 | Top navigation bar |
| Sidebar | 288 × 844 | File explorer + recent files |
| Properties Panel | 256 × 844 | File metadata |
| Main (empty) | 896 × 844 | Welcome state illustration |
| Main (with tree) | 896 × 844 | Active file tree view |

---

## 2. Design Tokens

### 2.1 Color Palette

```
surface-950  #090b14  — Primary background (darkest)
surface-900  #111624  — Elevated surfaces (panels, cards)
surface-850  #1a2032  — Input backgrounds, intermediate depth
surface-800  #232a3e  — Borders, subtle surfaces
surface-700  #353d54  — Hover states on borders
surface-600  #47516b  — Low-priority text, disabled
surface-500  #5c6685  — Secondary text, placeholder
surface-400  #7d88a8  — Muted text
surface-300  #a8b1c9  — Body text
surface-200  #d1d6e3  — High-emphasis text
surface-100  #e9ecf3  — Inverted surfaces
surface-50   #f8f9fc  — Lightest

primary-500   #4c6ef5  — Interactive elements, focus rings
primary-400   #748ffc  — Icon/fill variant on dark
primary-300   #91a7ff  — Selected text
primary-500/10 → #4c6ef5 at 10% — Selected row bg
primary-500/20 → #4c6ef5 at 20% — Selected row border

accent-500  #20c997  — Success states, recent files icon
accent-400  #38d9a9  — Icon variant on dark

danger-500  #ff6b6b  — Destructive actions
danger-400  #ff8787  — Icon variant on dark

warning-500  #fcc419  — Highlights, cautions
warning-400  #ffd43b  — Icon variant on dark
```

### 2.2 Typography

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| 2xs | 0.625rem (10px) | 600 (semibold) | 0.875rem | 0.02em |
| xs | 0.75rem (12px) | 500 (medium) | 1rem | 0.01em |
| sm | 0.8125rem (13px) | 400/500/600 | 1.25rem | normal |
| base | 0.875rem (14px) | 400 | 1.5rem | normal |
| lg | 1rem (16px) | 600 | 1.75rem | normal |
| xl | 1.125rem (18px) | 600 | 1.75rem | normal |
| 2xl | 1.25rem (20px) | 600 | 2rem | normal |

Font families:
- **Sans:** Inter (weights 400, 500, 600)
- **Mono:** JetBrains Mono (for IDs, sizes, keyboard shortcuts)

### 2.3 Shadows

```
shadow-xs    — 0 1px 2px rgba(0,0,0,0.4)
shadow-sm    — 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.3)
shadow-md    — 0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)
shadow-lg    — 0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -4px rgba(0,0,0,0.3)
shadow-xl    — 0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.3)

shadow-glow-sm   — 0 0 8px rgba(76,110,245,0.15)    — subtle primary glow
shadow-glow      — 0 0 16px rgba(76,110,245,0.25)   — active primary glow

inner-glow       — inset 0 1px 0 rgba(255,255,255,0.04)
inner-glow-lg    — inset 0 1px 0 rgba(255,255,255,0.06)
```

### 2.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| rounded-lg | 8px | Cards, panels, inputs |
| rounded-xl | 12px | Search bar, icons |
| rounded-2xl | 16px | Logo container |
| rounded-md | 6px | Badges, small icons |
| rounded-sm | 4px | Left accent border |

### 2.5 Spacing Grid

Base unit: 4px. Key spacings: 4, 6, 8, 12, 16, 20, 24, 32, 40, 48.

---

## 3. Component Specifications

### 3.1 Header (`Header.tsx`)

| Property | Value |
|---|---|
| Height | 56px (h-14) |
| Background | `bg-surface-950/80 backdrop-blur-xl` |
| Border bottom | `border-surface-800/60` |
| Padding | `px-5` (20px left/right) |
| Z-index | 10 (sticky top) |

**Logo icon:** 32×32px rounded-lg, gradient `from-primary-500 via-primary-600 to-primary-700`, shield icon.

**Title area:**
- "SecureVault" — text-sm, semibold, surface-200
- "Enterprise File Explorer" — text-2xs, font-medium, surface-500

**States:**
| Part | Default | Hover | Focus |
|---|---|---|---|
| Search input | border-surface-700/60 | border-surface-600/60 | border-primary-500/40 + shadow-glow-sm |
| Search icon | text-surface-500 | — | text-primary-400 |
| Kbd badge | bg-surface-850/60, border-surface-800/40 | — | — |
| Avatar circle | gradient border, 28×28px | — | — |

### 3.2 SearchBar (`SearchBar.tsx`)

| Property | Value |
|---|---|
| Max width | 448px (max-w-md) |
| Height | 36px (py-2 = 8px top/bottom padding) |
| Border radius | 12px (rounded-xl) |
| Background | `bg-surface-850/80` |

**Layout components:**
- Search icon (16×16px) — absolutely positioned left (12px from edge)
- Text input: full width, `pl-10 pr-9`
- Clear button (14×14px) — right side, appears when query is active
- Result count badge — right side (between text and clear button)

**States:**
| State | Visual |
|---|---|
| Default | border-surface-700/60, text-surface-200 |
| Hover (group) | border-surface-600/60 |
| Focus | border-primary-500/40, ring-1 ring-primary-500/20, bg-surface-850 |
| Focus (icon) | turns primary-400 |
| Has query | clear button + result count visible |

### 3.3 Sidebar (`Sidebar.tsx`)

| Property | Value |
|---|---|
| Width | 288px (w-72) → 320px (lg:w-80) |
| Background | `bg-surface-900/40` |
| Border right | `border-surface-800/60` |

**Section header components (File Explorer + Recent Files):**
- Icon container: 20×20px rounded-md, `bg-primary-500/10`, `border-primary-500/20`
- Title: text-2xs, uppercase, tracking-[0.08em], font-semibold, text-surface-500
- Padding: `px-3 py-2.5`

### 3.4 RecursiveTree — Empty State

| Element | Spec |
|---|---|
| Icon container | 40×40px rounded-xl, bg-surface-800/40, border-surface-700/30 |
| Search icon | 20×20px, text-surface-500 |
| Title | "No results found" — text-sm, font-medium, text-surface-500 |
| Subtitle | `"{query}" doesn't match any files` — text-xs, text-surface-600 |

### 3.5 TreeNode (`TreeNode.tsx`)

| Property | Value |
|---|---|
| Row height | ~36px (py-1.5 = 6px, text-sm = ~20px, gap-2) |
| Left padding | `8 + depth * 16` px |
| Border radius | 8px (rounded-lg) |

**States:**
| State | Background | Text | Border | Icon |
|---|---|---|---|---|
| Default (folder) | transparent | text-surface-400 | — | primary-400 |
| Default (file) | transparent | text-surface-400 | — | varies by type |
| Hover | bg-surface-800/60 | text-surface-200 | — | — |
| Selected | bg-primary-500/10 | text-primary-300 | primary-500/20 | primary-400 |
| Selected + accent | — | — | left 2px primary-500 border | — |

**Folder expanded indicator:** Chevron icon, 12×12px, rotates 90° when expanded, changes from surface-600 to primary-400.

**Children connector:** Vertical line, 1px, `bg-surface-800/40`, positioned at `7px + depth offset`.

**Empty folder state:** "Empty folder" — text-xs, italic, text-surface-600.

### 3.6 TreeNodeIcon (`TreeNodeIcon.tsx`)

Icon matrix (all 16×16px):

| Type | Icon | Color |
|---|---|---|
| Folder (closed) | folder outline | primary-400 |
| Folder (open) | open folder outline | warning-400 |
| File (generic) | document outline | surface-500 |
| Image | image outline | accent-400 |
| Code | code brackets | primary-400 |
| Spreadsheet | table grid | accent-400 |
| Document (pdf/doc) | document lines | danger-400 |
| Text | text lines | surface-400 |

### 3.7 PropertiesPanel (`PropertiesPanel.tsx`)

| Property | Value |
|---|---|
| Width | 256px (w-64) → 288px (lg:w-72) |
| Background | `bg-surface-900/30` |
| Border left | `border-surface-800/60` |

**Empty state:**
- Icon container: 48×48px rounded-xl, bg-surface-800/40, border-surface-700/30
- Icon: 24×24px document icon, text-surface-500
- Message: "No file selected" — text-sm, text-surface-500
- Hint: "Click any file in the explorer to view its properties" — text-xs, text-surface-600

**Selected state — File info card:**
- Panel card: `bg-surface-900/40`, rounded-xl, border-surface-800/50
- File icon: 40×40px rounded-xl, gradient bg, primary-400 icon
- Filename: text-sm, font-medium, text-surface-200, truncate
- File ID: text-2xs, font-mono, text-surface-500

**Property rows:**
- Container: panel-card, divide-y divide-surface-800/40
- Label: text-2xs, uppercase, tracking-[0.08em], font-semibold, text-surface-500
- Value: text-sm, text-surface-200 (or text-xs font-mono text-surface-300 for mono)
- Padding per row: px-3 py-2.5

### 3.8 RecentFiles (`RecentFiles.tsx`)

| Property | Value |
|---|---|
| Position | Bottom of sidebar, above border-top |
| Max items | 5 (LRU eviction) |

**Row states:**
| State | Background | Text | Border |
|---|---|---|---|
| Default | transparent | text-surface-500 | transparent |
| Hover | bg-surface-800/40 | text-surface-300 | transparent |
| Selected | bg-primary-500/10 | text-primary-300 | primary-500/20 |

**Row layout:**
- Icon: TreeNodeIcon (16×16px)
- Name: text-sm, truncate, flex-1
- Size: text-2xs, font-mono, text-surface-600 (optional)

### 3.9 Welcome / Empty State (Main Area)

| Element | Spec |
|---|---|
| Icon container | 80×80px rounded-2xl, gradient `from-primary-500/10 via-primary-500/5 to-surface-900`, border `primary-500/20`, shadow-glow-sm |
| Icon | 40×40px folder icon, text-primary-400 |
| Title | "Welcome to SecureVault" — text-lg, font-semibold, text-surface-300 |
| Description | "Browse your encrypted files..." — text-sm, text-surface-500, max-w-sm |
| Kbd shortcuts | 3 badges: Navigate (↑↓), Expand (→), Select (Enter) |

---

## 4. Animation Specs

| Animation | Duration | Easing | Usage |
|---|---|---|---|
| fade-in | 150ms | ease-out | Child tree nodes |
| fade-in-up | 200ms | ease-out | Properties panel content |
| slide-down | 200ms | cubic-bezier(0.16, 1, 0.3, 1) | Folder expand |
| scale-in | 150ms | ease-out | Modal/dialog |
| rotate | 200ms | ease-out | Folder chevron |
| colors | 150ms | ease-out | Hover transitions |

---

## 5. Focus & Accessibility

- Focus-visible: `ring-2 ring-primary-500/50 ring-offset-2 ring-offset-surface-950`
- Selection: `bg-primary-500/20 text-white`
- Scrollbar: 6px wide, rounded-full, surface-700/50 thumb
- Tree implements WAI-ARIA `tree`/`treeitem` roles
- Keyboard: ↑↓→← Enter for navigation

---

## 6. How to Recreate in Penpot

1. Create a new Penpot project named "SecureVault-Dashboard"
2. Set up color palette as Library Colors (all surface, primary, accent, danger, warning tokens)
3. Set up Typography styles in the font manager (Inter + JetBrains Mono)
4. Create components for each of the 8 component groups above
5. Define component variants for all states (default, hover, selected, focused, disabled)
6. Assemble the main artboard (1440×900) using instances of these components
7. Set sharing to "Anyone with the link can view"
8. Paste the share link into `README.md` under the "Design File" section
