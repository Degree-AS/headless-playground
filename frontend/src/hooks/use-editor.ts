'use client'
import { useEditorStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

/**
 * Custom hook that provides editor state and actions
 * Simple selector-based approach - no complex effects
 */
export function useEditor() {
  return useEditorStore(
    useShallow((state) => ({
      // Page state
      pages: state.pages,
      currentPageId: state.currentPageId,
      currentPage: state.getCurrentPage(),

      // Page actions
      setCurrentPageId: state.setCurrentPageId,
      updatePageContent: state.updatePageContent,
      addPage: state.addPage,
      deletePage: state.deletePage,
      renamePage: state.renamePage,

      // UI state
      isLoaded: state.isLoaded,
      puckVersion: state.puckVersion,
    }))
  )
}
