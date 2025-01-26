import { projectContext } from '@renderer/contexts/project'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import {
  DefaultSpinner,
  TLEditorSnapshot,
  Tldraw,
  createTLStore,
  exportToBlob,
  getSnapshot,
  loadSnapshot,
  throttle
} from 'tldraw'
import 'tldraw/tldraw.css'
import { toast } from '@renderer/hooks/use-toast' // Import toast from shadcn/ui
import Savebutton from './savebutton'

export default function TldrawProvider({ children }: { children: React.ReactNode }) {
  const { project, setProject } = useContext(projectContext)
  const [store] = useState(() => createTLStore())
  const [loadingState, setLoadingState] = useState<
    { status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
  >({
    status: 'loading'
  })

  // Fetch project data from the server when the component mounts
  useLayoutEffect(() => {
    const fetchProjectData = async () => {
      if (!project) return
      setLoadingState({ status: 'loading' })
      try {
        // Load the project data into the Tldraw store
        if (project?.tldrawData) {
          loadSnapshot(store, JSON.parse(project.tldrawData))
        }
        setLoadingState({ status: 'ready' })
      } catch (error: any) {
        console.error(error)

        setLoadingState({ status: 'error', error: error.message })
        toast({
          title: 'Error loading project',
          description: 'Failed to load project data. Please try again.',
          variant: 'destructive'
        })
      }
    }

    if (project?._id) {
      fetchProjectData()
    } else {
      setLoadingState({ status: 'ready' }) // No project ID, continue with an empty store
    }
  }, [project?._id])

  // Handle saving project data
  const handleSave = useCallback(async (editor: any) => {
    if (!project?._id) return

    const snapshot = getSnapshot(store)

    try {
      // Export the canvas as an image (thumbnail)
      const shapeIds = editor.getCurrentPageShapeIds()
      if (shapeIds.size === 0) return alert('No shapes on the canvas')
      const blob = await exportToBlob({
        editor,
        ids: [...shapeIds],
        format: 'png',
        opts: { background: true }
      })
      // Convert the blob to a base64 string
      const thumbnail = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })

      // Save the updated project data to the server
      await fetch(`http://localhost:3000/api/projects`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tldrawData: JSON.stringify(snapshot),
          id: project._id,
          metadata: {
            ...project.metadata,
            thumbnail // Include the base64-encoded thumbnail
          }
        })
      })

      console.log('Project saved successfully!')

      // Show success toast
      toast({
        title: 'Project saved successfully!',
        description: 'Your changes have been saved.'
      })
    } catch (error: any) {
      console.error('Failed to save project data:', error.message)

      // Show error toast
      toast({
        title: 'Error saving project',
        description: 'Failed to save project data. Please try again.',
        variant: 'destructive'
      })
    }
  }, [])
  // Show loading or error states
  if (loadingState.status === 'loading') {
    return (
      <div className="tldraw__editor">
        <h2>
          <DefaultSpinner />
        </h2>
      </div>
    )
  }

  if (loadingState.status === 'error') {
    return (
      <div className="tldraw__editor">
        <h2>Error!</h2>
        <p>{loadingState.error}</p>
      </div>
    )
  }

  return (
    <Tldraw inferDarkMode hideUi store={store}>
      {/* Pass the handleSave function to the child component */}
      <Savebutton onSave={handleSave} />
      {children}
    </Tldraw>
  )
}
