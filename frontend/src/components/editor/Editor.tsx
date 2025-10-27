'use client'
import { useEditor } from '@/hooks'
import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { editorConfig } from './EditorConfig'
import { PageSettingsButton } from './PageSettingsButton'
import { PageTree } from './PageTree'
import './styles.css'

export function Editor() {
  const {
    pages,
    currentPageId,
    currentPage,
    setCurrentPageId,
    addPage,
    deletePage,
    renamePage,
    puckVersion,
    isLoaded,
    handlePuckChange,
    handlePublish,
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
          onChange={handlePuckChange}
          onPublish={handlePublish}
        />
      </Panel>
    </PanelGroup>
  )
}
