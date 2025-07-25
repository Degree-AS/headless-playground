export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: ApiError
}
