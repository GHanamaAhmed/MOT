import ProtectedRoute from '@renderer/components/protectedRoute'
import TldrawProvider from '@renderer/components/TldrawProvider'
import Editor from '@renderer/views/editor'
import { DashboardRoutes } from './DashboardRoutes'
import { EditorRoutes } from './EditorRoutes'

export const ProtectedRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  children: [DashboardRoutes, EditorRoutes]
}
