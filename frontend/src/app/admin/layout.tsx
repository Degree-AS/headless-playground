import { requireAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/header'
import { AdminFooter } from '@/components/admin/footer'
import { AdminContentWrapper } from '@/components/admin/content-wrapper'

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
    <div className="fixed inset-0 flex flex-col">
      <AdminHeader />
      <main className="flex-1 overflow-auto">
        <AdminContentWrapper>{children}</AdminContentWrapper>
      </main>
      <AdminFooter />
    </div>
  )
}
