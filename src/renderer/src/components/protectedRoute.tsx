import { useEffect, useLayoutEffect, useRef } from 'react'
import { useUser, RedirectToSignIn } from '@clerk/clerk-react'
import { Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const { isSignedIn } = useUser()
  const { pathname } = useLocation()

  useEffect(() => {
    if (isSignedIn) {
      window.electron.ipcRenderer.send('window-change', {
        width: 1200,
        height: 800,
      })
    }
  }, [isSignedIn, pathname])

  return isSignedIn ? <Outlet /> : <RedirectToSignIn />
}
