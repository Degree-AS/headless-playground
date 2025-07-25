import { Suspense } from 'react'
import {
    Button,  NavigationMenu,  NavigationMenuContent,  NavigationMenuItem,  NavigationMenuLink,
    NavigationMenuList,  NavigationMenuTrigger
} from '@/components/ui'
import { navigationService } from '@/services'
import { AuthNodes,  StaticNodeItem } from '../header'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

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

const DesktopCmsNavigation = async () => {
  const cmsNodes = await navigationService.getNavigations()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {cmsNodes.map((node, idx) =>
          node.nodes && node.nodes.length > 0 ? (
            <NavigationMenuItem key={node.name ?? idx}>
              <NavigationMenuTrigger>{node.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-6 lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                  {node.nodes.map((node, itemIdx) => (
                    <NavigationMenuLink
                      key={node.name ?? itemIdx}
                      href={`cms/pageId=${node.pageId}`}
                      className="text-sm font-medium"
                    >
                      {node.name}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={node.name ?? idx}>
              <NavigationMenuLink href={`cms/pageId=${node.pageId}`}>
                {node.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const DesktopNavigation = ({
  staticNodes,
  authNodes,
}: {
  staticNodes: StaticNodeItem[]
  authNodes: AuthNodes
}) => {
  return (
    <nav className="hidden justify-between lg:flex">
      <div className="flex items-center gap-6">
        <Logo />
        <div className="flex items-center gap-6">
          <Suspense fallback={null}>
            <DesktopCmsNavigation />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-2">
        <NavigationMenu className="mr-4">
          <NavigationMenuList>
            {staticNodes.map((node) => renderDesktopMenuItem(node))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button asChild variant="outline" size="sm">
          <a href={authNodes.login.url}>{authNodes.login.title}</a>
        </Button>
        <Button asChild size="sm">
          <a href={authNodes.signup.url}>{authNodes.signup.title}</a>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  )
}
