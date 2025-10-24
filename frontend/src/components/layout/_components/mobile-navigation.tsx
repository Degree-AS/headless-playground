import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { type User } from '@/services'
import { Menu } from 'lucide-react'
import { AuthNodes, StaticNodeItem } from '../header'
import { CmsNavigationMobileClient } from './cms-navigation-mobile-client'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { UserMenuMobile } from './user-menu-mobile'

const renderMobileMenuItem = (node: StaticNodeItem) => {
  if (node.nodes && node.nodes.length > 0) {
    return (
      <AccordionItem key={node.title} value={node.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {node.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {node.nodes.map((subNode, idx) => (
            <SubMenuLink node={subNode} key={idx} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a key={node.title} href={node.url} className="text-md font-semibold">
      {node.title}
    </a>
  )
}

const SubMenuLink = ({ node }: { node: StaticNodeItem }) => {
  return (
    <a
      className="hover:bg-muted hover:text-accent-foreground flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
      href={node.url}
    >
      <div className="text-foreground">{node.icon}</div>
      <div>
        <div className="text-sm font-semibold">{node.title}</div>
        {node.description && (
          <p className="text-muted-foreground text-sm leading-snug">{node.description}</p>
        )}
      </div>
    </a>
  )
}


export const MobileNavigation = ({
  staticNodes,
  authNodes: auth,
  user,
}: {
  staticNodes: StaticNodeItem[]
  authNodes: AuthNodes
  user: User | null
}) => {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-12 p-4">
              <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                <CmsNavigationMobileClient />
                {staticNodes.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                {user ? (
                  <UserMenuMobile user={user} />
                ) : (
                  <>
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </>
                )}
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
