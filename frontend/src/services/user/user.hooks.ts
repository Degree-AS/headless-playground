import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { fetchClient, FetchError } from '@/lib/fetch-client'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './user.types'

const ENDPOINTS = {
  LOGIN: '/dwapi/users/authenticate',
  REGISTER: '/dwapi/users/register',
} as const

/**
 * Hook for user login mutation
 * @example
 * const loginMutation = useLogin()
 * loginMutation.mutate({ email: 'test@example.com', password: 'password' })
 */
export function useLogin(): UseMutationResult<
  LoginResponse,
  FetchError,
  LoginRequest
> {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return fetchClient.post<LoginResponse>(ENDPOINTS.LOGIN, credentials)
    },
  })
}

/**
 * Hook for user registration mutation
 * @example
 * const registerMutation = useRegister()
 * registerMutation.mutate({ email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe' })
 */
export function useRegister(): UseMutationResult<
  RegisterResponse,
  FetchError,
  RegisterRequest
> {
  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      return fetchClient.post<RegisterResponse>(ENDPOINTS.REGISTER, userData)
    },
  })
}
