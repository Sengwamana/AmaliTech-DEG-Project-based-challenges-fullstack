# SupportFlow Visual Builder

> Interactive decision-tree editor for SupportFlow AI — a customer support automation platform that replaces error-prone spreadsheet configuration with a visual flowchart interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4)

---

## Overview

SupportFlow Visual Builder transforms chatbot configuration from a messy spreadsheet workflow into an intuitive visual editor. Non-technical managers can see their conversation flow as a connected flowchart, edit questions in real-time, and test-drive the bot instantly — all without engineering support.

**Business value:** Reduces configuration errors, speeds up iteration cycles, and empowers product managers to own the customer experience directly.

---

## Features

### Visual Flow Canvas
Nodes are rendered from JSON with absolute positioning. SVG bezier curves with arrow markers connect parent nodes to their children based on the `options[].nextId` flow logic. A subtle dot-grid background provides spatial reference.

- **Cubic bezier curves** (`C` path commands) with gradient stroke opacity
- **Arrowhead markers** for directional clarity
- **Option labels** displayed as pill badges at curve midpoints
- **Hover effect** on connector lines (brightens stroke)

### Node Editor
Click any node to open the editor panel. Changes reflect on the canvas immediately.

- Live text editing with auto-focus
- Node metadata display (type badge, ID)
- Option list with numbered indicators
- Contextual info for end nodes
- Close button to deselect

### Undo / Redo (Wildcard)
Full history stack with up to 50 entries. Chosen because chatbot configuration is inherently iterative — managers experiment with phrasing, test flows, and frequently need to revert. The undo/redo toolbar buttons with keyboard shortcut hints make this feel native.

- Ctrl+Z / Ctrl+Shift+Z support
- Disabled states for boundaries
- History preserved across mode switches

### Preview Mode
Toggle between Editor and Preview to test the conversation flow as an end user:

1. Starts at the first `type: "start"` node
2. User selects an option → graph traverses via `nextId`
3. End nodes (`type: "end"`) show a "Start Over" button
4. Live pulse indicator signals active testing mode

### Segmented Mode Toggle
Edit / Preview buttons use a segmented control pattern with animated active state — a hallmark of professional design tools like Figma and Linear.

---

## Architecture

```
SupportFlow-Visual-Builder/
├── index.html                  # Entry point
├── flow_data.json              # Flow data (unchanged)
├── tailwind.config.js          # Design tokens
├── src/
│   ├── App.tsx                 # Root layout with mode routing
│   ├── main.tsx                # React entry
│   ├── index.css               # Base styles + node-card CSS
│   ├── types/
│   │   └── index.ts            # FlowNode, FlowOption, HistoryEntry
│   ├── data/
│   │   └── flowData.ts         # Data loader
│   ├── context/
│   │   └── FlowEditorContext.tsx  # State with history stack
│   ├── utils/
│   │   ├── graphTraversal.ts   # findNodeById, computeConnectors, traverseFlow
│   │   └── connectorUtils.ts   # Bezier path computation
│   └── components/
│       ├── Canvas/              # FlowCanvas, FlowNode, ConnectorLines
│       ├── Editor/              # NodeEditor
│       ├── Layout/              # Toolbar
│       ├── Preview/             # PreviewMode
│       └── common/              # clsx utility
```

### State Management

`FlowEditorContext` uses `useReducer` with a history stack:

```typescript
interface FlowState {
  nodes: FlowNode[]
  mode: 'edit' | 'preview'
  selectedNodeId: string | null
  previewNodeId: string | null
  history: HistoryEntry[]   // Up to 50 snapshots
  historyIndex: number
}
```

Every text or option edit pushes a deep-cloned snapshot onto the history stack. Undo/redo simply restores the appropriate snapshot, enabling full rollback without complex diff logic.

### Connector Strategy

1. `computeConnectors` iterates every node's `options[]` array
2. For each option with a valid `nextId`, it computes `from` (bottom-center of parent) and `to` (top-center of child) coordinates
3. `computeBezierPath` generates an SVG cubic bezier path `M x1 y1 C x1 (y1+cp), x2 (y2-cp), x2 y2`
4. Control point offset scales with vertical distance for natural curves

---

## Design System

Dark-mode theme matching SupportFlow AI's brand identity.

### Color Tokens

| Token | Base | Usage |
|---|---|---|
| `surface-950` | `#090b14` | Canvas background |
| `surface-900` | `#111624` | Panel backgrounds |
| `surface-850` | `#1a2032` | Input backgrounds |
| `primary-500` | `#4c6ef5` | Question nodes, interactive |
| `accent-500` | `#20c997` | Start nodes, preview indicator |
| `danger-500` | `#ff6b6b` | Destructive actions |

### Component Architecture

**FlowNode** — Glass card with `backdrop-filter: blur(8px)` and `linear-gradient` background. Type badges use semantic colors (accent for start, primary for question, surface for end). Selected state adds a gradient `::before` pseudo-element for a subtle glow border.

**ConnectorLines** — SVG `linearGradient` stroke that fades opacity from source to target. Labels rendered as `<rect>` + `<text>` pairs with pill styling.

**PreviewMode** — Chat card with macOS-style traffic light dots, live pulse indicator, and lettered option buttons (A, B, C...).

### Design File

> [View Design System in Penpot](https://penpot.app) — Open the `SupportFlow-Visual-Builder` project for full design frames including node cards, canvas layout, connectors, and color semantics.  
> _Alternatively, a PDF export of the design system is available upon request._

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
cd fullstack/SupportFlow-Visual-Builder

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
| Styling | Tailwind CSS 3 + custom CSS |
| State | React Context + useReducer with history |
| Graphics | SVG (bezier curves, markers, gradients) |
| Design | Custom components, no flowchart libraries |

---

## License

MIT — see [LICENSE](./LICENSE).
