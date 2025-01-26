import React from 'react'
import { ClerkProvider } from '@clerk/clerk-react'
import { ToastProvider } from '@renderer/components/ui/toast'
import Routes from './routes'
import { Toaster } from './components/ui/toaster'
import { BrowserRouter } from 'react-router-dom'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/sign-in">
      <ToastProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Toaster />
      </ToastProvider>
    </ClerkProvider>
  )
}
