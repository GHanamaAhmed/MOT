import { memo, useEffect } from 'react'
import { useEditor } from 'tldraw'

interface SaveButtonProps {
  onSave: (editor: any) => void // Callback function to handle saving
}

export default memo(function SaveButton({ onSave }: SaveButtonProps) {
  const editor = useEditor() // Access the Editor instance
  useEffect(() => {
    // Save on Ctrl + S (or Cmd + S on macOS)
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault() // Prevent the default browser save dialog
        onSave(editor)
      }
    }

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return <span></span>
})
