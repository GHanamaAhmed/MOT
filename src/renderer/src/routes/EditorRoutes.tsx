import ProtectedRoute from '@renderer/components/protectedRoute'
import TldrawProvider from '@renderer/components/TldrawProvider'
import Editor from '@renderer/views/editor'

export const EditorRoutes = {
  path: '/editor',
  element: (
    <div style={{ position: 'fixed', inset: 0 }}>
      <TldrawProvider>
        <Editor />
      </TldrawProvider>
    </div>
  )
}
