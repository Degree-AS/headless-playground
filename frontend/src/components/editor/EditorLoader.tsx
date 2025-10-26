import { Skeleton } from '@/components/ui/skeleton'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export function EditorLoader() {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={20} minSize={15} maxSize={40}>
        {/* Page tree skeleton */}
        <div className="border-r bg-muted/30 h-full flex flex-col">
          <div className="border-b p-4 shrink-0">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </Panel>
      <PanelResizeHandle className="w-1 bg-border hover:bg-accent transition-colors" />
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
