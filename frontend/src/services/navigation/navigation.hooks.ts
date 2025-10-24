import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchClient, FetchError } from '@/lib/fetch-client'
import type { NavigationNode, NavigationResponse } from './navigation.types'

const ENDPOINTS = {
  GET_NAVIGATIONS: '/dwapi/frontend/navigations',
} as const

export const navigationKeys = {
  all: ['navigation'] as const,
  byId: (id: number) => [...navigationKeys.all, id] as const,
}

/**
 * Hook for fetching navigation menu items
 * @param id - Navigation ID
 * @example
 * const { data: menuItems, isLoading } = useNavigation(1)
 */
export function useNavigation(
  id: number
): UseQueryResult<NavigationNode[], FetchError> {
  return useQuery({
    queryKey: navigationKeys.byId(id),
    queryFn: async () => {
      const response = await fetchClient.get<NavigationResponse>(
        `${ENDPOINTS.GET_NAVIGATIONS}/${id}`
      )

      if (!response?.nodes) return []

      return response.nodes.filter((node) => node.showInMenu)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - navigation doesn't change often
  })
}
