import { cookies } from 'next/headers'
import type { User, UserRole } from '@/services/user/user.types'

const AUTH_TOKEN_KEY = 'auth_token'
const USER_DATA_KEY = 'user_data'

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_TOKEN_KEY)?.value
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userDataCookie = cookieStore.get(USER_DATA_KEY)?.value

  if (!userDataCookie) {
    return null
  }

  try {
    return JSON.parse(userDataCookie) as User
  } catch {
    return null
  }
}

export async function hasRole(role: UserRole): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === role
}

export async function isAdmin(): Promise<boolean> {
  return hasRole('admin')
}

export async function isContentEditor(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin' || user?.role === 'contentEditor'
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()

  if (user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  return user
}

export async function requireContentEditor(): Promise<User> {
  const user = await requireAuth()

  if (user.role !== 'admin' && user.role !== 'contentEditor') {
    throw new Error('Forbidden: Content editor access required')
  }

  return user
}
