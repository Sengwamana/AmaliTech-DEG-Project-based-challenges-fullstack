import { memo, useCallback } from 'react'
import type { FlowNode as FlowNodeType } from '../../types'
import { useFlowEditor } from '../../context/FlowEditorContext'
import { clsx } from '../common/utils'

interface FlowNodeProps {
  node: FlowNodeType
  isSelected: boolean
}

export const FlowNode = memo(function FlowNode({ node, isSelected }: FlowNodeProps) {
  const { selectNode } = useFlowEditor()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      selectNode(node.id)
    },
    [node.id, selectNode]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        selectNode(node.id)
      }
    },
    [node.id, selectNode]
  )

  const typeConfig = {
    start: {
      badge: 'bg-accent-500/15 text-accent-400 border-accent-500/20',
      badgeText: 'START',
      border: 'border-accent-500/30',
    },
    question: {
      badge: 'bg-primary-500/15 text-primary-400 border-primary-500/20',
      badgeText: 'QUESTION',
      border: 'border-primary-500/30',
    },
    end: {
      badge: 'bg-surface-600/20 text-surface-400 border-surface-600/20',
      badgeText: 'END',
      border: 'border-surface-600/20',
    },
  }

  const config = typeConfig[node.type]

  return (
    <div
      className={clsx('node-card w-56', isSelected && 'selected')}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${config.badgeText} node: ${node.text}`}
    >
      <div className="px-3.5 pt-3 pb-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className={clsx(
            'px-2 py-0.5 rounded-md text-2xs font-semibold uppercase tracking-wider border',
            config.badge
          )}>
            {config.badgeText}
          </span>
          <span className="text-2xs font-mono text-surface-600">{node.id}</span>
        </div>

        <p className="text-sm text-surface-200 leading-relaxed line-clamp-3 font-medium">
          {node.text}
        </p>
      </div>

      {node.options.length > 0 && (
        <div className="px-3.5 pb-3 space-y-1.5">
          <div className="h-px bg-surface-800/60 -mx-3.5 mb-1.5" />
          {node.options.map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-surface-400"
            >
              <span className={clsx(
                'w-1.5 h-1.5 rounded-full shrink-0',
                i === 0 ? 'bg-primary-500/50' : 'bg-surface-600'
              )} />
              <span className="truncate">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
