// components/ui/toaster.tsx
import * as React from 'react'
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastProvider
} from './toast'
import { useToast } from '@renderer/hooks/use-toast'
import { ToastViewport } from './toast'
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <div className="flex flex-col gap-1">
        {toasts.map(({ id, title, description, variant, action }) => (
          <Toast key={id} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
      </div>
      <ToastViewport />
    </ToastProvider>
  )
}
