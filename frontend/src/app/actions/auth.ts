'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchClient } from '@/lib/fetch-client'
import type { LoginResponse } from '@/services/user/user.types'

/**
 * Server Action for user login
 * React 19 + Next.js 16 pattern - replaces API routes
 */
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      error: 'Email and password are required',
    }
  }

  try {
    const response = await fetchClient.post<LoginResponse>('/dwapi/users/authenticate', {
      email,
      password,
    })

    // Set cookies on server side (more secure)
    const cookieStore = await cookies()
    cookieStore.set('auth_token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day
      path: '/',
    })

    cookieStore.set('user_data', JSON.stringify(response.user), {
      httpOnly: false, // Accessible to client for UI
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    })

    // Redirect based on role
    if (response.user.role === 'admin') {
      redirect('/admin')
    } else {
      redirect('/')
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Login failed',
    }
  }
}

/**
 * Server Action for user logout
 */
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  cookieStore.delete('user_data')
  redirect('/login')
}
