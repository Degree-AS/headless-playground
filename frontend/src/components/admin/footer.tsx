import Link from 'next/link'

export function AdminFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background mt-auto">
      <div className="flex h-14 items-center justify-between px-4 text-sm text-muted-foreground">
        <div className="flex gap-6">
          <Link
            href="/admin/help"
            className="hover:text-foreground transition-colors"
          >
            Help
          </Link>
          <Link
            href="/admin/settings"
            className="hover:text-foreground transition-colors"
          >
            Settings
          </Link>
        </div>
        <div>
          © {currentYear} Admin Panel. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
