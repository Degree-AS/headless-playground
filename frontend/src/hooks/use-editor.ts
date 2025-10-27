'use client'
import { useEffect } from 'react'
import { useEditorStore, cleanupEditor } from '@/store'

/**
 * Custom hook that manages editor state and lifecycle
 * Handles page state, UI state, and debounced rename operations
 */
export function useEditor() {
  // Page state
  const pages = useEditorStore((state) => state.pages)
  const currentPageId = useEditorStore((state) => state.currentPageId)
  const currentPage = useEditorStore((state) => state.getCurrentPage())

  // Page actions
  const setCurrentPageId = useEditorStore((state) => state.setCurrentPageId)
  const updatePageContent = useEditorStore((state) => state.updatePageContent)
  const addPage = useEditorStore((state) => state.addPage)
  const deletePage = useEditorStore((state) => state.deletePage)
  const renamePage = useEditorStore((state) => state.renamePage)

  // UI state
  const isLoaded = useEditorStore((state) => state.isLoaded)
  const puckVersion = useEditorStore((state) => state.puckVersion)
  const lastExternalName = useEditorStore((state) => state.lastExternalName)
  const debouncedRename = useEditorStore((state) => state.debouncedRename)

  // UI actions
  const setIsLoaded = useEditorStore((state) => state.setIsLoaded)
  const incrementPuckVersion = useEditorStore((state) => state.incrementPuckVersion)
  const updateLastExternalName = useEditorStore((state) => state.updateLastExternalName)
  const initializeDebouncedRename = useEditorStore((state) => state.initializeDebouncedRename)

  // Initialize debounced rename on mount
  useEffect(() => {
    initializeDebouncedRename(renamePage)
    setIsLoaded(true)

    return () => {
      cleanupEditor()
    }
  }, [initializeDebouncedRename, renamePage, setIsLoaded])

  // Detect external name changes (from PageTree) and force re-mount
  useEffect(() => {
    if (currentPage && currentPage.name !== lastExternalName) {
      updateLastExternalName(currentPage.name)
      incrementPuckVersion()
    }
  }, [
    currentPage?.name,
    lastExternalName,
    updateLastExternalName,
    incrementPuckVersion,
    currentPage,
  ])

  return {
    // Page data
    pages,
    currentPageId,
    currentPage,

    // Page actions
    setCurrentPageId,
    updatePageContent,
    addPage,
    deletePage,
    renamePage,

    // Puck state
    isLoaded,
    puckVersion,
    debouncedRename,
  }
}
