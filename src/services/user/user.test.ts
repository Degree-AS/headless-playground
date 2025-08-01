process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { describe, expect, it } from 'vitest'
import { userService } from './user.service'

describe('Login', () => {
  it('should retrieve authentication token for valid credentials', async () => {
    const response = await userService.login({
      username: 'username',
      password: 'password',
    })

    expect(response).toBeDefined()
    expect(response.token.length).toBeGreaterThan(0)
  })

  it('should return empty token for 403 server response', async () => {
    const response = await userService.login({
      username: '403',
      password: '',
    })

    expect(response).toBeDefined()
    expect(response.token.length).toBeFalsy()
  })

  it('should return empty token for 404 server response', async () => {
    const response = await userService.login({
      username: '403',
      password: '',
    })

    expect(response).toBeDefined()
    expect(response.token.length).toBeFalsy()
  })
})
