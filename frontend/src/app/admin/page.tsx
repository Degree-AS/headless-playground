import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui'

export default async function AdminPage() {
  const user = await getCurrentUser()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.firstName} {user?.lastName}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Page Editor</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Create and edit pages using the visual page builder
          </p>
          <Button asChild>
            <Link href="/admin/editor">Open Editor</Link>
          </Button>
        </div>

        <div className="border rounded-lg p-6 opacity-50">
          <h2 className="text-xl font-semibold mb-2">Content Management</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Manage your content and media files
          </p>
          <Button disabled variant="outline">
            Coming Soon
          </Button>
        </div>

        <div className="border rounded-lg p-6 opacity-50">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Manage users and permissions
          </p>
          <Button disabled variant="outline">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  )
}
