'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui'
import { useNavigation } from '@/services/navigation/navigation.hooks'

export function CmsNavigationMobileClient() {
  const { data: cmsNodes, isLoading } = useNavigation(1)

  if (isLoading || !cmsNodes) {
    return null
  }

  return (
    <>
      {cmsNodes.map((node) => {
        if (node.nodes) {
          return (
            <AccordionItem key={node.name} value={node.name} className="border-b-0">
              <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                {node.name}
              </AccordionTrigger>
              <AccordionContent className="mt-2">
                {node.nodes.map((subNode) => (
                  <a
                    key={subNode.name}
                    className="hover:bg-muted hover:text-accent-foreground flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                    href={`cms/pageId=${subNode.pageId}`}
                  >
                    <div className="text-sm font-semibold">{subNode.name}</div>
                  </a>
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        }

        return (
          <a
            key={node.name}
            href={`cms/pageId=${node.pageId}`}
            className="text-md font-semibold"
          >
            {node.name}
          </a>
        )
      })}
    </>
  )
}
