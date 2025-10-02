import { ApiResponse } from '../api.types'
import { httpClient } from '../http-client'
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './user.types'

export class UserService {
  private static readonly ENDPOINTS = {
    LOGIN: '/dwapi/users/authenticate',
    REGISTER: '/dwapi/users/register',
  }

  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return await httpClient.post<LoginRequest, LoginResponse>(UserService.ENDPOINTS.LOGIN, request)
  }

  async register(request: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return await httpClient.post<RegisterRequest, RegisterResponse>(
      UserService.ENDPOINTS.REGISTER,
      request,
    )
  }
}

export const userService = new UserService()
