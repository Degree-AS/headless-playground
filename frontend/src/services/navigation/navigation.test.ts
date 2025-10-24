process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { describe, expect, it } from 'vitest'
import { get } from '@/lib/fetch-client'
import type { NavigationResponse } from './navigation.types'

const NAVIGATION_ENDPOINT = '/dwapi/frontend/navigations'

describe('Navigation API', () => {
  it('should retrieve CMS pages list for navigation purposes', async () => {
    const response = await get<NavigationResponse>(`${NAVIGATION_ENDPOINT}/1`)

    expect(response).toBeDefined()
    expect(response.nodes).toBeDefined()
    expect(response.nodes.length).toBeGreaterThan(0)
    
    // Check first node structure
    const firstNode = response.nodes[0]
    expect(firstNode.pageId).toBeDefined()
    expect(firstNode.name).toBeDefined()
    expect(firstNode.showInMenu).toBeDefined()
  })

  it('should filter nodes that show in menu', async () => {
    const response = await get<NavigationResponse>(`${NAVIGATION_ENDPOINT}/1`)
    const menuNodes = response.nodes.filter(node => node.showInMenu)

    expect(menuNodes.length).toBeGreaterThan(0)
    menuNodes.forEach(node => {
      expect(node.showInMenu).toBe(true)
    })
  })

  it('should handle nested navigation nodes', async () => {
    const response = await get<NavigationResponse>(`${NAVIGATION_ENDPOINT}/1`)
    
    // Find node with children
    const nodeWithChildren = response.nodes.find(node => node.nodes && node.nodes.length > 0)
    
    if (nodeWithChildren) {
      expect(nodeWithChildren.nodes).toBeDefined()
      expect(Array.isArray(nodeWithChildren.nodes)).toBe(true)
      expect(nodeWithChildren.nodes!.length).toBeGreaterThan(0)
    }
  })
})
