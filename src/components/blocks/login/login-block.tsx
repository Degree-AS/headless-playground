'use client'
import { Card, CardContent } from '@/components/ui'
/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import { userService } from '@/services'
import { LoginFormData } from './form/auth.types'
import { LoginForm } from './form/login-form'

const onSubmit = async (data: LoginFormData): Promise<void> => {
  const loginResponse = await userService.login({
    request: {
      email: data.email,
      password: data.password,
    },
  })

  console.log('Login response:', loginResponse)
}

export function LoginBlock({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm onSubmit={onSubmit} />

          <div className="bg-muted relative hidden md:block">
            <img
              src="https://www.degree.no/hubfs/Imported_Blog_Media/home-banner.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
