export type UserRole = 'admin' | 'contentEditor' | 'user'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: User
}

export type RegisterRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type RegisterResponse = {
  token: string
  user: User
}
