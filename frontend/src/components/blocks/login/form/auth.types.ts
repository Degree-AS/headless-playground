import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }).min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    email: z.email({ message: 'Please enter a valid email address' }).min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
