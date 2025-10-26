import Link from 'next/link'

export function AdminHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center gap-8 px-4">
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
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← Back to Site
          </Link>
        </div>
      </div>
    </header>
  )
}
