import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="container flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
