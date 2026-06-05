# SupportFlow Visual Builder — Design System

> Use this document to recreate the design in Penpot or Figma.  
> **Share the design file with "Anyone with the link can view" permission.**

---

## 1. Canvas & Artboards

| Artboard | Size | Description |
|---|---|---|
| App Shell | 1440 × 900 | Full layout: toolbar + canvas + node editor |
| Toolbar | 1440 × 48 | Top bar with undo/redo, mode toggle, reset |
| Canvas | 1440 × 852 | Dot-grid background with nodes + connectors |
| Node Editor | 288 × 852 | Side panel for editing selected node |
| Preview Mode | 1440 × 852 | Chat-like conversation flow tester |
| FlowNode (start) | 224 × ~110 | Start node card |
| FlowNode (question) | 224 × ~130 | Question node card with options |
| FlowNode (end) | 224 × ~90 | End node card |

---

## 2. Design Tokens

### 2.1 Color Palette

```
surface-950  #090b14  — Canvas background (darkest)
surface-900  #111624  — Panel backgrounds (toolbar, editor)
surface-850  #1a2032  — Input backgrounds, dot-grid stroke
surface-800  #232a3e  — Borders, SVG arrowhead/line color
surface-700  #353d54  — Hover borders
surface-600  #47516b  — Low-priority text, SVG gradients
surface-500  #5c6685  — Secondary text, placeholder
surface-400  #7d88a8  — Muted text
surface-300  #a8b1c9  — Body text
surface-200  #d1d6e3  — High-emphasis text

primary-500   #4c6ef5  — Question nodes, interactive elements
primary-400   #748ffc  — Icon/fill on dark surfaces
primary-300   #91a7ff  — Selected text

accent-500  #20c997  — Start nodes, preview indicator
accent-400  #38d9a9  — Icon variant on dark

danger-500  #ff6b6b  — Destructive actions
danger-400  #ff8787  — Icon variant

warning-500  #fcc419  — Highlights
warning-400  #ffd43b  — Icon variant
```

### 2.2 Typography

Same as SecureVault (see `secure-vault/DESIGN.md` §2.2).

### 2.3 Shadows

Same as SecureVault with additional:
```
shadow-glow-accent  — 0 0 16px rgba(32,201,151,0.25)  — accent glow for start nodes
```

### 2.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| rounded-xl | 12px | Node cards |
| rounded-lg | 8px | Panels, toolbar items |
| rounded-md | 6px | Type badges |
| rounded-sm | 4px | Small indicators |

### 2.5 Spacing Grid

Same as SecureVault (base unit 4px).

---

## 3. Component Specifications

### 3.1 Toolbar (`Toolbar.tsx`)

| Property | Value |
|---|---|
| Height | 48px |
| Background | `bg-surface-900/60 backdrop-blur-xl` |
| Border bottom | `border-surface-800/60` |
| Padding | `px-4` (16px) |

**Layout (left to right):**
1. Logo: 28×28px rounded-lg, gradient from-primary-500 to-accent-500, branching paths icon
2. Title: "SupportFlow Builder" — text-sm font-semibold surface-200
3. Undo button (Ctrl+Z)
4. Redo button (Ctrl+Shift+Z)
5. Spacer (flex-1)
6. Mode toggle: segmented control with Edit + Preview buttons
7. Reset button

**Toolbar buttons:**
| State | Spec |
|---|---|
| Default | `p-1.5 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800/60 border border-transparent` |
| Disabled | `opacity-40 cursor-not-allowed text-surface-600` |

**Segmented mode toggle:**
- Container: `bg-surface-850 p-0.5 rounded-xl border border-surface-800/40`
- Active button: `bg-surface-800 px-3 py-1 rounded-lg text-sm font-medium text-surface-200`
- Inactive button: `px-3 py-1 rounded-lg text-sm text-surface-500 hover:text-surface-300`
- Animated active indicator (background swap, no actual sliding animation)

**Mode toggle states:**
| State | Visual |
|---|---|
| Edit active | Edit = active style, Preview = inactive style |
| Preview active | Preview = active style, Edit = inactive style |

**Preview pulse indicator:** 6×6px rounded-full, `bg-accent-500`, animation `pulse-subtle 2s infinite`, only visible in preview mode.

### 3.2 FlowCanvas (`FlowCanvas.tsx`)

| Property | Value |
|---|---|
| Background | `bg-surface-950` |
| Scroll | overflow-auto (both axes) |

**Dot grid:**
- Pattern: SVG `<pattern>` with `width=32 height=32`
- Dot: 0.5px stroke, `#1a2032` (surface-850)
- Opacity: 0.3

**Radial gradients (ambient):**
- Top-left: `radial-gradient(ellipse at 30% 20%, rgba(76,110,245,0.03), transparent 60%)`
- Bottom-right: `radial-gradient(ellipse at 70% 80%, rgba(32,201,151,0.02), transparent 50%)`

**Canvas sizing:**
- Based on node positions (computed in context)
- Min width/height: 100%
- Default: 2400×1600px

### 3.3 FlowNode (`FlowNode.tsx`)

| Property | Value |
|---|---|
| Width | 224px (w-56) |
| Card class | `node-card` |

**Node card anatomy (top to bottom):**
1. **Header:** type badge + node ID
2. **Text:** node content (3-line clamp)
3. **Divider:** 1px `bg-surface-800/60` (only if options exist)
4. **Options list:** dot + label for each option

**Type configurations:**

| Type | Badge BG | Badge Text | Badge Border | Card Border |
|---|---|---|---|---|
| start | bg-accent-500/15 | "START" (accent-400) | accent-500/20 | accent-500/30 |
| question | bg-primary-500/15 | "QUESTION" (primary-400) | primary-500/20 | primary-500/30 |
| end | bg-surface-600/20 | "END" (surface-400) | surface-600/20 | surface-600/20 |

**Card styling:**
- Background: `bg-surface-900/80 backdrop-blur-sm`
- Border: 1px solid (per type config)
- Border-radius: 12px
- Shadow: `shadow-lg`
- Selected: add class `selected` which wraps in a `::before` pseudo-element with gradient glow border

**States:**
| State | Visual |
|---|---|
| Default | Standard border per type, shadow-lg |
| Hover | Slightly brighter border, elevated shadow |
| Selected | Gradient `::before` glow ring, primary glow |
| Focus-visible | ring-2 ring-primary-500/50 |

**Option dots:** 6×6px rounded-full, first option = primary-500/50, rest = surface-600.

### 3.4 ConnectorLines (`ConnectorLines.tsx`)

**Connector path:** SVG cubic bezier curve using `computeBezierPath`.

**Gradient:** Linear gradient from top to bottom:
- `stop 0%: #47516b opacity 0.9`
- `stop 100%: #47516b opacity 0.4`

**Arrowhead marker:**
- Size: 8×6px
- Fill: #47516b
- Polygon: `0,0 8,3 0,6`

**Label pill:**
- Background: via CSS class `connector-label-bg`
- Border: 1px #232a3e
- Radius: 6px
- Text: `connector-label` class, centered at midpoint

### 3.5 NodeEditor (`NodeEditor.tsx`)

| Property | Value |
|---|---|
| Width | 288px (w-72) |
| Background | `bg-surface-900/30` |
| Border left | `border-surface-800/60` |

**Empty state:**
- Icon: 40×40px rounded-xl, bg-surface-800/40, border-surface-700/30
- Message: "No node selected" — text-sm, font-medium, text-surface-500
- Hint: "Click any node on the canvas to edit its content" — text-xs, text-surface-600

**Selected state layout:**
1. Section header (same pattern as SecureVault sidebar headers)
2. Type badge (per type config)
3. Node ID (text-2xs, font-mono, text-surface-600)
4. Text editor:
   - Textarea: full width, `glass-input` style
   - Rows: 3-5
   - Auto-focus on selection
   - Live update on change
5. Options list:
   - Label input for each option
   - Target indicator for each
   - Numbered dots

### 3.6 PreviewMode (`PreviewMode.tsx`)

| Property | Value |
|---|---|
| Full screen overlay | Replaces canvas + editor |
| Background | `bg-surface-950` |
| Centered layout | max-w-lg, centered |

**Chat card styling:**
- macOS-style traffic light dots (close, minimize, zoom) at top-left
- "SupportFlow AI" header with pulse dot
- Conversation bubble for current node text
- Option buttons: lettered (A, B, C...) or numbered
- Option button style: `px-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50 hover:bg-surface-700/50 hover:border-primary-500/30 text-surface-200 font-medium`
- End state: "Conversation ended" message + "Start Over" button

**States:**
| State | Visual |
|---|---|
| Start node | Show first node text + options |
| Option selected | Update to child node text + options |
| End node | Show end message + "Start Over" |
| Start Over | Reset to first node |

---

## 4. SVG Specifications

### 4.1 Bezier Connector Path

```
M {fromX} {fromY + 12}
C {fromX} {fromY + 12 + cp}, {toX} {toY - cp}, {toX} {toY}
```

Where `cp` = control point offset = `Math.abs(fromY - toY) * 0.4` (clamped min 40px).

### 4.2 Arrowhead Marker

```svg
<marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
  <polygon points="0 0, 8 3, 0 6" fill="#47516b" />
</marker>
```

### 4.3 Dot Grid Pattern

```svg
<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1a2032" stroke-width="0.5" />
</pattern>
```

---

## 5. Animation Specs

| Animation | Duration | Easing | Usage |
|---|---|---|---|
| fade-in | 150ms | ease-out | Panel content |
| panel-slide | 200ms | ease-out | Node editor open/close |
| connector | 300ms | ease-out | Connector line updates |
| pulse-subtle | 2s | ease-in-out infinite | Preview mode indicator |

---

## 6. State Management Flows (for UX spec)

**Edit mode flow:**
1. User sees canvas with all nodes and connectors
2. Click node → NodeEditor opens on right, node gets selected glow
3. Edit text → canvas updates live
4. Undo/redo → canvas and editor sync

**Preview mode flow:**
1. Toggle "Preview" in toolbar
2. Canvas/editor hidden, preview mode visible
3. Starts at first `type: "start"` node
4. User clicks option letter → traverse via `nextId`
5. End node → "Start Over" button
6. Toggle "Edit" → return to canvas

---

## 7. How to Recreate in Penpot

1. Create a new Penpot project named "SupportFlow-Visual-Builder"
2. Set up color palette as Library Colors (all surface, primary, accent, danger tokens)
3. Set up Typography styles (Inter + JetBrains Mono)
4. Create FlowNode component with 3 variants: start, question, end
5. Create Toolbar component with button states (default, hover, disabled, active)
6. Create PreviewMode component with conversation flow states
7. Create ConnectorLines as a reusable SVG group
8. Assemble the main artboard (1440×900)
9. Set sharing to "Anyone with the link can view"
10. Paste the share link into `README.md` under the "Design File" section
