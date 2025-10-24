process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { describe, expect, it } from 'vitest'
import { post } from '@/lib/fetch-client'
import type { LoginRequest, LoginResponse } from './user.types'

const LOGIN_ENDPOINT = '/dwapi/users/authenticate'

describe('User API - Login', () => {
  it('should retrieve authentication token for valid credentials', async () => {
    const credentials: LoginRequest = {
      email: 'admin@example.com',
      password: 'admin123',
    }

    const response = await post<LoginResponse>(LOGIN_ENDPOINT, credentials)

    expect(response).toBeDefined()
    expect(response.token).toBeDefined()
    expect(response.token.length).toBeGreaterThan(0)
    expect(response.user).toBeDefined()
    expect(response.user.email).toBe(credentials.email)
  })

  it('should throw FetchError for invalid credentials (401)', async () => {
    const credentials: LoginRequest = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    }

    await expect(post<LoginResponse>(LOGIN_ENDPOINT, credentials)).rejects.toThrow()
  })

  it('should return correct user role for admin', async () => {
    const credentials: LoginRequest = {
      email: 'admin@example.com',
      password: 'admin123',
    }

    const response = await post<LoginResponse>(LOGIN_ENDPOINT, credentials)

    expect(response.user.role).toBe('admin')
    expect(response.user.firstName).toBe('Admin')
    expect(response.user.lastName).toBe('User')
  })

  it('should return correct user role for content editor', async () => {
    const credentials: LoginRequest = {
      email: 'editor@example.com',
      password: 'editor123',
    }

    const response = await post<LoginResponse>(LOGIN_ENDPOINT, credentials)

    expect(response.user.role).toBe('contentEditor')
    expect(response.user.firstName).toBe('Content')
    expect(response.user.lastName).toBe('Editor')
  })

  it('should return correct user role for regular user', async () => {
    const credentials: LoginRequest = {
      email: 'user@example.com',
      password: 'user123',
    }

    const response = await post<LoginResponse>(LOGIN_ENDPOINT, credentials)

    expect(response.user.role).toBe('user')
    expect(response.user.firstName).toBe('Regular')
    expect(response.user.lastName).toBe('User')
  })
})
