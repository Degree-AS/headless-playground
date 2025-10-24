import { fetchClient } from '@/lib/fetch-client'
import type { NavigationResponse } from '@/services/navigation/navigation.types'

export async function getPageOptions() {
  try {
    const response = await fetchClient.get<NavigationResponse>('/dwapi/frontend/navigations/1')
    const pages = response.nodes.filter((node) => node.showInMenu)

    const flattenPages = (nodes: typeof pages, prefix = ''): Array<{ label: string; value: string }> => {
      return nodes.flatMap((node) => {
        const current = {
          label: prefix + node.name,
          value: node.pageId.toString(),
        }
        const children = node.nodes ? flattenPages(node.nodes, prefix + node.name + ' > ') : []
        return [current, ...children]
      })
    }

    const options = flattenPages(pages)

    // Dodaj opcję custom URL na początku
    return [
      { label: '-- Custom URL --', value: 'custom' },
      ...options,
    ]
  } catch (error) {
    console.error('Failed to load pages:', error)
    return [{ label: '-- Custom URL --', value: 'custom' }]
  }
}
