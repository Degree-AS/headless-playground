process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { describe,  expect,  it } from 'vitest'
import { navigationService } from './navigation.service'

describe('Get Navigation', () => {
  it('should retrieve CMS pages list for navigation purposes', async () => {
    const nodes = await navigationService.getNavigations()

    expect(nodes).toBeDefined()
    expect(nodes.nodes.length).toBeGreaterThan(0)
  })
})
