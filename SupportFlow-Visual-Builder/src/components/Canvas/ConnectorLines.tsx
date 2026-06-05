import { useMemo } from 'react'
import { useFlowEditor } from '../../context/FlowEditorContext'
import { computeConnectors } from '../../utils/graphTraversal'
import { computeBezierPath } from '../../utils/connectorUtils'

const NODE_WIDTH = 224

export function ConnectorLines() {
  const { state } = useFlowEditor()

  const connectors = useMemo(
    () => computeConnectors(state.nodes, NODE_WIDTH, 0),
    [state.nodes]
  )

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#47516b" />
        </marker>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#47516b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#47516b" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {connectors.map((conn, i) => {
        const y1 = conn.from.y + 12
        const y2 = conn.to.y
        const midY = (y1 + y2) / 2

        const path = computeBezierPath(conn.from.x, conn.from.y + 12, conn.to.x, conn.to.y)

        return (
          <g key={`${conn.fromId}-${conn.toId}-${i}`}>
            <path
              d={path}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="transition-all duration-300"
            />
            <g>
              <rect
                x={conn.from.x - (conn.label.length * 3.8) - 6}
                y={midY - 9}
                width={conn.label.length * 7.6 + 12}
                height={18}
                rx="6"
                className="connector-label-bg"
              />
              <rect
                x={conn.from.x - (conn.label.length * 3.8) - 6}
                y={midY - 9}
                width={conn.label.length * 7.6 + 12}
                height={18}
                rx="6"
                fill="none"
                stroke="#232a3e"
                strokeWidth="1"
              />
              <text
                x={conn.from.x}
                y={midY + 1}
                textAnchor="middle"
                className="connector-label"
                dominantBaseline="middle"
              >
                {conn.label}
              </text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}
