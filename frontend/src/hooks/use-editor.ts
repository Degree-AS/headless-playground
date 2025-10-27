'use client'
import type { RootProps } from '@/components/editor/types'
import { useEditorStore } from '@/store'
import { generateSlug } from '@/utils/slug'
import type { Data } from '@measured/puck'
import { debounce } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useSlugGeneration } from './use-slug-generation'

/**
 * Custom hook that provides editor state and actions
 * Uses separate selectors to avoid shallow comparison issues with nested objects
 */
export function useEditor() {
  // Extract values individually to ensure proper re-renders when nested data changes
  const pages = useEditorStore((state) => state.pages)
  const currentPageId = useEditorStore((state) => state.currentPageId)
  const currentPage = useEditorStore((state) => state.getCurrentPage())
  const isLoaded = useEditorStore((state) => state.isLoaded)
  const puckVersion = useEditorStore((state) => state.puckVersion)

  // Actions are stable references, extract once
  const setCurrentPageId = useEditorStore((state) => state.setCurrentPageId)
  const updatePageContent = useEditorStore((state) => state.updatePageContent)
  const addPage = useEditorStore((state) => state.addPage)
  const deletePage = useEditorStore((state) => state.deletePage)
  const renamePage = useEditorStore((state) => state.renamePage)

  // Slug generation logic
  const { initializeSlug, processSlugGeneration } = useSlugGeneration()

  // Initialize slug tracking for current page
  if (currentPage) {
    const rootProps: RootProps = (currentPage.content.root?.props ||
      currentPage.content.root) as RootProps
    const currentSlug = rootProps?.slug
    if (currentSlug) {
      initializeSlug(currentPageId, currentSlug)
    }
  }

  // Debounced version of renamePage - waits 500ms after last change
  const debouncedRenamePage = useMemo(
    () =>
      debounce((pageId: string, newName: string) => {
        renamePage(pageId, newName)
      }, 500),
    [renamePage]
  )

  // Handle Puck editor changes
  const handlePuckChange = useCallback(
    (data: Data) => {
      // Process slug auto-generation
      const updatedData = processSlugGeneration(data, currentPageId)

      // Extract title for page name sync
      const rootProps: RootProps = (updatedData.root?.props || updatedData.root) as RootProps
      const newTitle = rootProps?.title

      // Update content immediately
      updatePageContent(currentPageId, updatedData)

      // Sync title to page name - debounced to avoid lag while typing
      if (newTitle && newTitle.trim() && newTitle.trim() !== currentPage?.name) {
        debouncedRenamePage(currentPageId, newTitle.trim())
      }
    },
    [currentPageId, currentPage?.name, processSlugGeneration, updatePageContent, debouncedRenamePage]
  )

  // Handle publish action
  const handlePublish = useCallback(
    (data: Data) => {
      console.log('Published data for page:', currentPage?.name, data)
      // TODO: Add API call to publish page
    },
    [currentPage?.name]
  )

  // Handle rename from PageTree
  // Updates both name and slug, and resets slug tracking
  const handleRenamePage = useCallback(
    (pageId: string, newName: string) => {
      // Generate new slug that will be used by renamePage
      const newSlug = generateSlug(newName)

      // Update name and slug in store
      renamePage(pageId, newName)

      // Update slug tracking ref so useSlugGeneration knows about the change
      initializeSlug(pageId, newSlug)
    },
    [renamePage, initializeSlug]
  )

  return {
    // State
    pages,
    currentPageId,
    currentPage,
    isLoaded,
    puckVersion,

    // Basic actions
    setCurrentPageId,
    updatePageContent,
    addPage,
    deletePage,
    renamePage: handleRenamePage,

    // Editor handlers
    handlePuckChange,
    handlePublish,
  }
}
