'use client'

import { usePathname } from 'next/navigation'

export function AdminContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEditor = pathname === '/admin/editor'

  if (isEditor) {
    return <>{children}</>
  }

  return <div className="container mx-auto px-4 py-8 max-w-7xl">{children}</div>
}
