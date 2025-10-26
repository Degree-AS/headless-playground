'use client'
import {
  headingBlockConfig,
  type HeadingBlockProps,
} from '@/components/blocks/heading/heading-block'
import { heroBlockConfig, type HeroBlockProps } from '@/components/blocks/hero/hero-block'
import { Puck, type Config } from '@measured/puck'
import '@measured/puck/puck.css'
import { useEffect } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import './editor.css'
import { EditorLoader } from './EditorLoader'
import { PageTree } from './PageTree'
import { useEditorStore } from './use-editor-store'

type Props = {
  HeadingBlock: HeadingBlockProps
  HeroBlock: HeroBlockProps
}

// Puck component config
const config: Config<Props> = {
  components: {
    HeadingBlock: headingBlockConfig,
    HeroBlock: heroBlockConfig,
  },
  root: {
    render: ({ children }) => {
      return <>{children}</>
    },
  },
}

// Editor component
export function Editor() {
  // Get state and actions from store
  const pages = useEditorStore((state) => state.pages)
  const currentPageId = useEditorStore((state) => state.currentPageId)
  const isLoaded = useEditorStore((state) => state.isLoaded)
  const currentPage = useEditorStore((state) => state.getCurrentPage())

  const setCurrentPageId = useEditorStore((state) => state.setCurrentPageId)
  const updatePageContent = useEditorStore((state) => state.updatePageContent)
  const addPage = useEditorStore((state) => state.addPage)
  const deletePage = useEditorStore((state) => state.deletePage)
  const renamePage = useEditorStore((state) => state.renamePage)
  const setIsLoaded = useEditorStore((state) => state.setIsLoaded)

  // Mark as loaded on mount (persist middleware handles localStorage)
  useEffect(() => {
    setIsLoaded(true)
  }, [setIsLoaded])

  // Show loading state
  if (!isLoaded) {
    return <EditorLoader />
  }

  if (!currentPage) {
    return <div className="p-4">Page not found</div>
  }

  return (
    <PanelGroup direction="horizontal" className="h-full" autoSaveId="editor-panels">
      <Panel defaultSize={20} minSize={10} maxSize={40}>
        <PageTree
          pages={pages}
          currentPageId={currentPageId}
          onSelectPage={setCurrentPageId}
          onAddPage={addPage}
          onDeletePage={deletePage}
          onRenamePage={renamePage}
        />
      </Panel>
      <PanelResizeHandle className="bg-border hover:bg-accent w-1 transition-colors" />
      <Panel defaultSize={80}>
        <Puck
          key={currentPageId} // Force re-render when page changes
          config={config}
          data={currentPage.content}
          iframe={{ enabled: false }}
          onPublish={(data) => {
            updatePageContent(currentPageId, data)
            console.log('Published data for page:', currentPage.name, data)
          }}
        />
      </Panel>
    </PanelGroup>
  )
}
