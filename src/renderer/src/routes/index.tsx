import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { AuthenticationRoutes } from './AuthRoutes'
import { EditorRoutes } from './EditorRoutes'
import { DashboardRoutes } from './DashboardRoutes'
import { ProtectedRoutes } from './ProtectedRoutes'
export default function index() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/sign-in" replace />
    },
    AuthenticationRoutes,
    ProtectedRoutes
  ])
}
