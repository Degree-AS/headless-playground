'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui'
import { useNavigation } from '@/services/navigation/navigation.hooks'

export function CmsNavigationClient() {
  const { data: cmsNodes, isLoading } = useNavigation(1)

  if (isLoading || !cmsNodes) {
    return null
  }

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
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
