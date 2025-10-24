import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui'
import { type User } from '@/services'
import { AuthNodes, StaticNodeItem } from '../header'
import { CmsNavigationClient } from './cms-navigation-client'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'

const renderDesktopMenuItem = (node: StaticNodeItem) => {
  if (node.nodes && node.nodes.length > 0) {
    return (
      <NavigationMenuItem key={node.title}>
        <NavigationMenuTrigger>{node.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid w-[400px] gap-3 p-6 lg:w-[500px] lg:grid-cols-[1fr_1fr]">
            {node.nodes.map((subNode, idx) => (
              <SubMenuLink node={subNode} key={idx} />
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }
  return (
    <NavigationMenuItem key={node.title}>
      <NavigationMenuLink href={node.url}>{node.title}</NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const SubMenuLink = ({ node }: { node: StaticNodeItem }) => {
  return (
    <NavigationMenuLink key={node.title} href={node.url} className="grid grid-rows-2">
      <div className="flex flex-row items-center gap-2">
        {node.icon}
        <div className="text-sm font-medium">{node.title}</div>
      </div>
      <p className="text-muted-foreground text-sm leading-snug">{node.description}</p>
    </NavigationMenuLink>
  )
}


export const DesktopNavigation = ({
  staticNodes,
  authNodes,
  user,
}: {
  staticNodes: StaticNodeItem[]
  authNodes: AuthNodes
  user: User | null
}) => {
  return (
    <nav className="hidden justify-between lg:flex">
      <div className="flex items-center gap-6">
        <Logo />
        <div className="flex items-center gap-6">
          <CmsNavigationClient />
        </div>
      </div>

      <div className="flex gap-2">
        <NavigationMenu className="mr-4">
          <NavigationMenuList>
            {staticNodes.map((node) => renderDesktopMenuItem(node))}
          </NavigationMenuList>
        </NavigationMenu>

        {user ? (
          <UserMenu user={user} />
        ) : (
          <>
            <Button asChild variant="outline" size="sm">
              <a href={authNodes.login.url}>{authNodes.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={authNodes.signup.url}>{authNodes.signup.title}</a>
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  )
}
