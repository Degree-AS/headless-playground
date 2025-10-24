import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { fetchClient, FetchError } from '@/lib/fetch-client'
import type { SavePageRequest, SavePageResponse } from './pages.types'

const ENDPOINTS = {
  SAVE_PAGE: '/dwapi/pages',
} as const

/**
 * Hook for saving/updating a page
 * @example
 * const savePageMutation = useSavePage()
 * savePageMutation.mutate({ slug: 'my-page', title: 'My Page', data: {...} })
 */
export function useSavePage(): UseMutationResult<
  SavePageResponse,
  FetchError,
  SavePageRequest
> {
  return useMutation({
    mutationFn: async (pageData: SavePageRequest) => {
      return fetchClient.post<SavePageResponse>(ENDPOINTS.SAVE_PAGE, pageData)
    },
  })
}
