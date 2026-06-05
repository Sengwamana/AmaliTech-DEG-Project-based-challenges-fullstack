# Penpot Import Guide

> Use this guide to import the SVG design assets into Penpot and create your shared design files.

## Step 1: Create Penpot Account

1. Go to [Penpot](https://penpot.app) and sign up for free
2. Create a new project for each app:
   - `SecureVault-Dashboard`
   - `SupportFlow-Visual-Builder`

## Step 2: Import SVG Assets

### For SecureVault

1. In Penpot, open the `SecureVault-Dashboard` project
2. **Import each SVG file** via File → Import or drag & drop:
   - `secure-vault/design-assets/app-layout.svg` — full app layout overview
   - `secure-vault/design-assets/tree-node-states.svg` — all tree node states
   - `secure-vault/design-assets/search-bar.svg` — search bar states
   - `secure-vault/design-assets/properties-panel.svg` — properties panel states
   - `secure-vault/design-assets/recent-files.svg` — recent files panel

3. **Convert to components** (right-click → Create Component):
   - `TreeNode` (with variants: default, hover, selected, expanded)
   - `SearchBar` (with variants: default, focused, has-query)
   - `PropertiesPanel` (with variants: empty, file-selected)
   - `RecentFiles` (with variants: default, hover, selected)
   - `Header`
   - `Sidebar`

4. **Set up Design Tokens** (View → Design Tokens):
   - Add all color tokens from `DESIGN.md` §2.1
   - Set Typography styles from `DESIGN.md` §2.2
   - Save shadow presets from `DESIGN.md` §2.3

### For SupportFlow

1. Open the `SupportFlow-Visual-Builder` project
2. **Import each SVG file**:
   - `SupportFlow-Visual-Builder/design-assets/app-layout.svg`
   - `SupportFlow-Visual-Builder/design-assets/flow-nodes.svg`
   - `SupportFlow-Visual-Builder/design-assets/toolbar.svg`
   - `SupportFlow-Visual-Builder/design-assets/connectors.svg`
   - `SupportFlow-Visual-Builder/design-assets/node-editor.svg`
   - `SupportFlow-Visual-Builder/design-assets/preview-mode.svg`

3. **Convert to components**:
   - `FlowNode` (with variants: start, question, end, selected)
   - `Toolbar` (with variants: edit-mode, preview-mode, button-disabled)
   - `ConnectorLine` (with label pill)
   - `NodeEditor` (with variants: empty, editing)
   - `PreviewMode` (with variants: start-node, option-selected, end-node)

## Step 3: Set up Color Library

Open the **Libraries Panel** in Penpot and add the shared colors:

### For SecureVault
```
surface-950  #090b14   | surface-900  #111624   | surface-850  #1a2032
surface-800  #232a3e   | surface-700  #353d54   | surface-600  #47516b
surface-500  #5c6685   | surface-400  #7d88a8   | surface-300  #a8b1c9
surface-200  #d1d6e3   | surface-100  #e9ecf3   | surface-50   #f8f9fc
primary-500  #4c6ef5   | primary-400  #748ffc   | primary-300  #91a7ff
accent-500   #20c997   | accent-400  #38d9a9    | accent-300  #63e6be
danger-500   #ff6b6b   | danger-400  #ff8787    | danger-300  #ffa8a8
warning-500  #fcc419   | warning-400 #ffd43b
```

### For SupportFlow (subset — same color system)
Same as SecureVault above, with emphasis on:
- surface-950 for canvas
- primary-500 for question nodes
- accent-500 for start nodes
- surface-600 for end nodes

## Step 4: Assemble the Main Artboard

1. Create a new artboard: `1440 × 900` px
2. Drag component instances from the Assets panel
3. Arrange per the `app-layout.svg` reference
4. Use the grid layout from `DESIGN.md` for exact positioning

## Step 5: Share the Design File

1. In Penpot, click the **Share** button (top-right)
2. Set **"Anyone with the link can view"**
3. Copy the share link
4. Replace the placeholder link in `README.md`

> The SVG assets are located in:
> - `secure-vault/design-assets/`
> - `SupportFlow-Visual-Builder/design-assets/`
