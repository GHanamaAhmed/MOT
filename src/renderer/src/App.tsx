import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthenticationPage, { UserAuthForm } from './components/login-form'
import Editor from './components/editor'
import TldrawProvider from './components/TldrawProvider'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full h-screen flex justify-center items-center">
              <AuthenticationPage />
            </div>
          }
        />
        <Route
          path="/Editor"
          element={
            <>
              <div style={{ position: 'fixed', inset: 0 }}>
                <TldrawProvider>
                  <Editor />
                </TldrawProvider>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
