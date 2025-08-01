process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { describe, expect, it } from 'vitest'
import { userService } from './user.service'

describe('Login', () => {
  it('should retrieve authentication token for valid credentials', async () => {
    const response = await userService.login({
      email: 'username@email.com',
      password: 'password',
    })

    expect(response.success).toBeTruthy()
    expect(response.error).toBeFalsy()
    expect(response.data?.token.length).toBeGreaterThan(0)
  })

  it('should return failed response for 403 server response', async () => {
    const response = await userService.login({
      email: '403@email.com',
      password: '',
    })

    expect(response?.data).toBeUndefined()
    expect(response.success).toBeFalsy()
    expect(response.error?.length).toBeGreaterThan(0)
  })

  it('should return failed response for 404 server response', async () => {
    const response = await userService.login({
      email: '403@email.com',
      password: '',
    })

    expect(response?.data).toBeUndefined()
    expect(response.success).toBeFalsy()
    expect(response.error?.length).toBeGreaterThan(0)
  })
})
