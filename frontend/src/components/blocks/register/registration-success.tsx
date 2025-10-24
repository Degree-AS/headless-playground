'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'

interface RegistrationSuccessProps {
  email: string
}

export function RegistrationSuccess({ email }: RegistrationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 text-center md:p-8">
      <div className="bg-green-50 dark:bg-green-950 rounded-full p-3">
        <CheckCircle2 className="text-green-600 dark:text-green-400 h-16 w-16" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Welcome aboard!</h1>
        <p className="text-muted-foreground text-balance">
          Your account has been created successfully.
        </p>
      </div>

      <div className="bg-muted w-full rounded-lg p-4">
        <p className="text-sm">
          <span className="text-muted-foreground">Account created for:</span>
          <br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button asChild className="w-full">
          <Link href="/login">Continue to Login</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>

      <p className="text-muted-foreground text-xs">
        You can now sign in with your credentials
      </p>
    </div>
  )
}
