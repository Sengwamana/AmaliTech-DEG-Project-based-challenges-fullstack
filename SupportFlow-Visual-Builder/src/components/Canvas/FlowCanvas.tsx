import { useCallback } from 'react'
import { useFlowEditor, canvasSize } from '../../context/FlowEditorContext'
import { FlowNode } from './FlowNode'
import { ConnectorLines } from './ConnectorLines'

export function FlowCanvas() {
  const { state, selectNode } = useFlowEditor()

  const handleCanvasClick = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  return (
    <div
      className="relative flex-1 overflow-auto bg-surface-950"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 30% 20%, rgba(76, 110, 245, 0.03) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 80%, rgba(32, 201, 151, 0.02) 0%, transparent 50%)
        `,
      }}
      onClick={handleCanvasClick}
      role="region"
      aria-label="Flow Canvas"
    >
      <div
        className="relative"
        style={{
          width: `${canvasSize.w}px`,
          height: `${canvasSize.h}px`,
          minWidth: '100%',
          minHeight: '100%',
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1a2032" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <ConnectorLines />

        {state.nodes.map((node) => (
          <FlowNode
            key={node.id}
            node={node}
            isSelected={state.selectedNodeId === node.id}
          />
        ))}
      </div>
    </div>
  )
}
