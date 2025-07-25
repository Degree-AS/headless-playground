import axios,  { AxiosInstance,  AxiosRequestConfig,  AxiosResponse } from 'axios'
import { env } from '@/config/env'

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
    this.client.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.post<TResponse>(url, data, config)
    return response.data
  }

  async put<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.put<TResponse>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

export const httpClient = new HttpClient()
