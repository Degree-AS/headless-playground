import { env } from '@/config/env'

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message)
    this.name = 'FetchError'
  }
}

type FetchOptions = RequestInit & {
  params?: Record<string, string>
}

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL
const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
}

/**
 * Internal function to make HTTP requests
 */
async function request<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options

  let url = `${BASE_URL}${endpoint}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      ...DEFAULT_HEADERS,
      ...fetchOptions.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new FetchError(
        `HTTP error: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return (await response.json()) as T
    }

    return (await response.text()) as unknown as T
  } catch (error) {
    if (error instanceof FetchError) {
      throw error
    }

    throw new FetchError(
      error instanceof Error ? error.message : 'Network error occurred'
    )
  }
}

/**
 * Make a GET request
 */
export async function get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'GET',
  })
}

/**
 * Make a POST request
 */
export async function post<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * Make a PUT request
 */
export async function put<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * Make a DELETE request
 */
export async function deleteFetch<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'DELETE',
  })
}

/**
 * Make a PATCH request
 */
export async function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// Legacy object-style API for backward compatibility
export const fetchClient = {
  get,
  post,
  put,
  delete: deleteFetch,
  patch,
}
