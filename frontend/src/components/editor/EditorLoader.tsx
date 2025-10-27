'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export function EditorLoader() {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={20} minSize={15} maxSize={40}>
        {/* Page tree skeleton */}
        <div className="bg-muted/30 flex h-full flex-col border-r">
          <div className="shrink-0 border-b p-4">
            <Skeleton className="mb-2 h-5 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </Panel>
      <PanelResizeHandle className="bg-border hover:bg-accent w-1 transition-colors" />
      <Panel defaultSize={80}>
        {/* Editor skeleton */}
        <div className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </Panel>
    </PanelGroup>
  )
}
