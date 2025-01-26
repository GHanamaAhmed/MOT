import ProtectedRoute from '@renderer/components/protectedRoute'
import TldrawProvider from '@renderer/components/TldrawProvider'
import Editor from '@renderer/views/editor'
import CustomUserProfile from '@renderer/views/userProfile'

export const UserProfileRoutes = {
  path: '/user-profile',
  element: <CustomUserProfile />
}
