import { Book, Sunset, Trees, Zap } from 'lucide-react'
import { DesktopNavigation } from './_components/desktop-navigation'
import { MobileNavigation } from './_components/mobile-navigation'
import { getCurrentUser } from '@/lib/auth'

export interface StaticNodeItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  nodes?: StaticNodeItem[]
}

const staticNodes: StaticNodeItem[] = [
  {
    title: 'Products',
    url: '#',
    nodes: [
      {
        title: 'Blog',
        description: 'The latest industry news, updates, and info',
        icon: <Book className="size-5 shrink-0" />,
        url: '#',
      },
      {
        title: 'Company',
        description: 'Our mission is to innovate and empower the world',
        icon: <Trees className="size-5 shrink-0" />,
        url: '#',
      },
      {
        title: 'Careers',
        description: 'Browse job listing and discover our workspace',
        icon: <Sunset className="size-5 shrink-0" />,
        url: '#',
      },
      {
        title: 'Support',
        description: 'Get in touch with our support team or visit our community forums',
        icon: <Zap className="size-5 shrink-0" />,
        url: '#',
      },
    ],
  },
  {
    title: 'Resources',
    url: '#',
    nodes: [
      {
        title: 'Help Center',
        description: 'Get all the answers you need right here',
        icon: <Zap className="size-5 shrink-0" />,
        url: '#',
      },
      {
        title: 'Contact Us',
        description: 'We are here to help you with any questions you have',
        icon: <Sunset className="size-5 shrink-0" />,
        url: '#',
      },
      {
        title: 'Status',
        description: 'Check the current status of our services and APIs',
        icon: <Trees className="size-5 shrink-0" />,
        url: '#',
      },
      {
        title: 'Terms of Service',
        description: 'Our terms and conditions for using our services',
        icon: <Book className="size-5 shrink-0" />,
        url: '#',
      },
    ],
  },
]

export interface AuthNodes {
  login: { title: string; url: string }
  signup: { title: string; url: string }
}

const authNodes: AuthNodes = {
  login: { title: 'Login', url: '/login' },
  signup: { title: 'Sign up', url: '/register' },
}

const Header = async () => {
  const user = await getCurrentUser()

  return (
    <section className="py-4">
      <div className="container">
        <DesktopNavigation staticNodes={staticNodes} authNodes={authNodes} user={user} />
        <MobileNavigation staticNodes={staticNodes} authNodes={authNodes} user={user} />
      </div>
    </section>
  )
}

export { Header }
