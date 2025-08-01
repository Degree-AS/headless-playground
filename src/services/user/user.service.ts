import { ApiResponse } from '../api.types'
import { httpClient } from '../http-client'
import { LoginRequest, LoginResponse } from './user.types'

export class UserService {
  private static readonly ENDPOINTS = {
    LOGIN: '/dwapi/users/authenticate',
  }

  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return await httpClient.post<LoginRequest, LoginResponse>(UserService.ENDPOINTS.LOGIN, request)
  }
}

export const userService = new UserService()
