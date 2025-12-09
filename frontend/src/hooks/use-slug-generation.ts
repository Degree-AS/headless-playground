'use client'
import type { RootProps } from '@/components/editor/types'
import { generateSlug } from '@/utils'
import type { Data } from '@measured/puck'
import { useCallback, useRef } from 'react'

export function useSlugGeneration() {
  // Track last auto-generated slug to detect manual edits
  const lastAutoSlugRef = useRef<Record<string, string>>({})

  /**
   * Initialize slug tracking for a page
   */
  const initializeSlug = useCallback((pageId: string, initialSlug: string) => {
    if (!lastAutoSlugRef.current[pageId]) {
      lastAutoSlugRef.current[pageId] = initialSlug
    }
  }, [])

  /**
   * Process data and auto-generate slug if needed
   * Returns updated data object
   */
  const processSlugGeneration = useCallback(
    (data: Data, pageId: string): Data => {
      const rootProps: RootProps = (data.root?.props || data.root) as RootProps
      const newTitle = rootProps?.title
      const currentSlug = rootProps?.slug

      // Smart slug auto-generation: only generate if user hasn't manually edited
      if (newTitle) {
        const lastAutoSlug = lastAutoSlugRef.current[pageId]
        const userManuallyEditedSlug = currentSlug && currentSlug !== lastAutoSlug

        // Only auto-generate if user hasn't manually edited the slug
        if (!userManuallyEditedSlug) {
          const newSlug = generateSlug(newTitle)

          // Update in root.props (new Puck format)
          if (data.root?.props) {
            ;(data.root.props as RootProps).slug = newSlug
          } else {
            // Fallback for old format - cast to any to add custom properties
            ;(data.root as any).slug = newSlug
          }

          // Track this as the last auto-generated slug
          lastAutoSlugRef.current[pageId] = newSlug
        }
      }

      return data
    },
    []
  )

  return {
    initializeSlug,
    processSlugGeneration,
  }
}
