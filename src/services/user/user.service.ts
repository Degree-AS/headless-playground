import { AxiosError } from 'axios'
import { httpClient } from '../http-client'
import { LoginRequest, LoginResponse } from './user.types'

export class UserService {
  private static readonly ENDPOINTS = {
    LOGIN: '/dwapi/users/authenticate',
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    let response: LoginResponse
    try {
      response = await httpClient.post<LoginRequest, LoginResponse>(
        UserService.ENDPOINTS.LOGIN,
        request,
      )

      return response
    } catch (error) {
      //403 and 404 error codes are expected responses from api, anything else is an exception
      if ((error as AxiosError).status == 403 || (error as AxiosError).status == 404) {
        return {
          token: '',
        }
      }
      throw error
    }
  }
}

export const userService = new UserService()
