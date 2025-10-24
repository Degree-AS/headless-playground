'use client'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import type { User } from '@/services'
import { User as UserIcon, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

const handleLogout = () => {
  document.cookie = 'auth_token=; path=/; max-age=0'
  document.cookie = 'user_data=; path=/; max-age=0'
  window.location.href = '/login'
}

export function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserIcon className="h-4 w-4" />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>
              {user.firstName} {user.lastName}
            </span>
            <span className="text-muted-foreground text-xs font-normal">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Admin Panel
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
