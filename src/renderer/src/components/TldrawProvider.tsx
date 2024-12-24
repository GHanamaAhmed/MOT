import React, { useLayoutEffect, useState } from 'react'
import { DefaultSpinner, Tldraw, createTLStore, getSnapshot, loadSnapshot, throttle } from 'tldraw'
import 'tldraw/tldraw.css'

export default function TldrawProvider({ children }: { children: React.ReactNode }) {
  const [presistenceKey, setPresistenceKey] = useState('')
  useLayoutEffect(() => {
    const activeUser: { username: string; password: string } = JSON.parse(
      localStorage.getItem('activeUser') || '{}'
    )
    setPresistenceKey(activeUser.username)
  }, [localStorage])
  //[1]
  const [store] = useState(() => createTLStore())
  //[2]
  const [loadingState, setLoadingState] = useState<
    { status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
  >({
    status: 'loading'
  })
  //[3]
  useLayoutEffect(() => {
    setLoadingState({ status: 'loading' })

    // Get persisted data from local storage
    const persistedSnapshot = localStorage.getItem(presistenceKey)

    if (persistedSnapshot) {
      try {
        const snapshot = JSON.parse(persistedSnapshot)
        loadSnapshot(store, snapshot)
        setLoadingState({ status: 'ready' })
      } catch (error: any) {
        setLoadingState({ status: 'error', error: error.message }) // Something went wrong
      }
    } else {
      setLoadingState({ status: 'ready' }) // Nothing persisted, continue with the empty store
    }

    // Each time the store changes, run the (debounced) persist function
    const cleanupFn = store.listen(
      throttle(() => {
        const snapshot = getSnapshot(store)
        localStorage.setItem(presistenceKey, JSON.stringify(snapshot))
      }, 500)
    )

    return () => {
      cleanupFn()
    }
  }, [store])

  // [4]
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
    <Tldraw
      inferDarkMode
      hideUi // Pass in the array of custom shape classes
      store={store}
    >
      {children}
    </Tldraw>
  )
}
