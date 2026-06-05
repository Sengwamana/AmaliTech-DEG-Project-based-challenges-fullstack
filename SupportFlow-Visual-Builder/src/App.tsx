import { FlowEditorProvider } from './context/FlowEditorContext'
import { Toolbar } from './components/Layout/Toolbar'
import { FlowCanvas } from './components/Canvas/FlowCanvas'
import { NodeEditor } from './components/Editor/NodeEditor'
import { PreviewMode } from './components/Preview/PreviewMode'
import { useFlowEditor } from './context/FlowEditorContext'

function EditorLayout() {
  const { state } = useFlowEditor()

  return (
    <div className="flex flex-1 overflow-hidden">
      <FlowCanvas />
      {state.mode === 'edit' && <NodeEditor />}
    </div>
  )
}

function AppContent() {
  const { state } = useFlowEditor()

  return (
    <div className="h-screen flex flex-col bg-surface-950">
      <Toolbar />
      {state.mode === 'edit' ? <EditorLayout /> : <PreviewMode />}
    </div>
  )
}

export default function App() {
  return (
    <FlowEditorProvider>
      <AppContent />
    </FlowEditorProvider>
  )
}
