import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { env } from '@/config/env'
import { ApiResponse } from './api.types'

class HttpClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
  }

  private onError<T>(error: unknown): ApiResponse<T> {
    if (error && (error as AxiosError).isAxiosError) {
      return {
        data: undefined,
        success: false,
        error: (error as AxiosError).message,
      }
    }

    return {
      data: undefined,
      success: false,
      error: 'Unexpected http-client error occurred',
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config)
      return {
        data: response.data,
        success: true,
      }
    } catch (error: unknown) {
      return this.onError<T>(error)
    }
  }

  async post<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<TResponse>> {
    try {
      const response = await this.client.post<TResponse>(url, data, config)
      return {
        data: response.data,
        success: true,
        error: undefined,
      }
    } catch (error: unknown) {
      return this.onError<TResponse>(error)
    }
  }

  async put<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<TResponse>> {
    try {
      const response = await this.client.put<TResponse>(url, data, config)
      return {
        data: response.data,
        success: true,
      }
    } catch (error: unknown) {
      return this.onError<TResponse>(error)
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config)
      return {
        data: response.data,
        success: true,
      }
    } catch (error: unknown) {
      return this.onError<T>(error)
    }
  }
}

export const httpClient = new HttpClient()
