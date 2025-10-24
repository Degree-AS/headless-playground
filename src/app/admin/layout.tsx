import { requireAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requireAdmin()
  } catch {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center gap-8 px-4">
          <Link href="/admin" className="text-lg font-semibold">
            Admin Panel
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/editor"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Page Editor
            </Link>
          </nav>
          <div className="ml-auto">
            <Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
