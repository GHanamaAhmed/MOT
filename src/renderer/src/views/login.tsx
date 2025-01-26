import { SignIn } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function LogIn() {
  const { pathname } = useLocation()
  useEffect(() => {
    localStorage.setItem('pathname', pathname)
  }, [])
  return (
    <div className="clerk-auth-container">
      <SignIn
        appearance={{
          elements: {
            root: 'w-full h-full',
            card: 'w-full h-full shadow-none rounded-none border-none bg-transparent',
            form: 'w-full max-w-[400px] mx-auto',
            formButtonPrimary: 'w-full',
            socialButtonsBlockButton: 'w-full'
          }
        }}
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  )
}
