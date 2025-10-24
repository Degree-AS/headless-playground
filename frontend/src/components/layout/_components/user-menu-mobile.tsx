'use client'

import { Button } from '@/components/ui'
import type { User } from '@/services'
import { LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

const handleLogout = () => {
  document.cookie = 'auth_token=; path=/; max-age=0'
  document.cookie = 'user_data=; path=/; max-age=0'
  window.location.href = '/login'
}

export function UserMenuMobile({ user }: { user: User }) {
  return (
    <>
      <div className="border rounded-lg p-3">
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>
      {user.role === 'admin' && (
        <Button asChild variant="outline">
          <Link href="/admin">
            <Settings className="mr-2 h-4 w-4" />
            Admin Panel
          </Link>
        </Button>
      )}
      <Button onClick={handleLogout} variant="destructive">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </>
  )
}
