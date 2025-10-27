'use client'
import {
  headingBlockConfig,
  type HeadingBlockProps,
} from '@/components/blocks/heading/heading-block'
import { heroBlockConfig, type HeroBlockProps } from '@/components/blocks/hero/hero-block'
import { useEditor } from '@/hooks'
import { generateSlug } from '@/utils'
import { Puck, type Config } from '@measured/puck'
import '@measured/puck/puck.css'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { PageSettingsButton } from './PageSettingsButton'
import { PageTree } from './PageTree'
import './styles.css'

type EditorProps = {
  HeadingBlock: HeadingBlockProps
  HeroBlock: HeroBlockProps
}

const editorConfig: Config<EditorProps> = {
  components: {
    HeadingBlock: headingBlockConfig,
    HeroBlock: heroBlockConfig,
  },
  root: {
    fields: {
      title: {
        type: 'text',
        label: 'Page Title',
      },
      slug: {
        type: 'text',
        label: 'URL Slug',
      },
      metaDescription: {
        type: 'textarea',
        label: 'Meta Description',
      },
      metaKeywords: {
        type: 'text',
        label: 'Meta Keywords (comma-separated)',
      },
    },
    render: ({ children }) => children,
  },
}

export function Editor() {
  const {
    pages,
    currentPageId,
    currentPage,
    setCurrentPageId,
    updatePageContent,
    addPage,
    deletePage,
    renamePage,
    puckVersion,
    isLoaded,
  } = useEditor()

  // Wait for Zustand persist hydration
  if (!isLoaded) {
    return <div className="p-4">Loading editor...</div>
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
          key={`${currentPageId}-v${puckVersion}`} // Re-mount when page changes or external name change forces version bump
          config={editorConfig}
          data={currentPage.content}
          iframe={{ enabled: false }}
          overrides={{
            headerActions: ({ children }) => (
              <>
                <PageSettingsButton />
                {children}
              </>
            ),
          }}
          onChange={(data) => {
            const newTitle = data.root?.title as string | undefined
            const currentSlug = data.root?.slug as string | undefined
            const previousTitle = currentPage.content.root?.title as string | undefined

            // Auto-generate slug from title if:
            // 1. Slug is empty/undefined, OR
            // 2. Title changed and slug was auto-generated from previous title
            const shouldAutoGenerateSlug =
              !currentSlug || (previousTitle && currentSlug === generateSlug(previousTitle))

            if (newTitle && shouldAutoGenerateSlug) {
              data.root = {
                ...data.root,
                slug: generateSlug(newTitle),
              }
            }

            // Update content immediately
            updatePageContent(currentPageId, data)

            // Sync title to page name directly
            if (newTitle && newTitle.trim() && newTitle !== currentPage.name) {
              renamePage(currentPageId, newTitle.trim())
            }
          }}
          onPublish={(data) => {
            console.log('Published data for page:', currentPage.name, data)
          }}
        />
      </Panel>
    </PanelGroup>
  )
}
