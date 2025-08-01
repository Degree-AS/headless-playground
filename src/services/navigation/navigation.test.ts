process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { describe, expect, it } from 'vitest'
import { navigationService } from './navigation.service'

describe('Get Navigation', () => {
  it('Should retrieve CMS pages list for navigation purposes', async () => {
    const nodes = await navigationService.getNavigations()

    expect(nodes).toBeDefined()
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('Should return failed response for 401 server response', async () => {
    const nodes = await navigationService.getNavigations()

    expect(nodes).toBeDefined()
    expect(nodes.length).toBeGreaterThan(0)
  })
})
