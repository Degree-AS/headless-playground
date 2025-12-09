'use client'

import { Button } from '@/components/ui'
import type { Page } from './types'
import { ChevronRight, ChevronDown, Plus, Trash2, FileText, Home } from 'lucide-react'
import { useState } from 'react'

interface PageTreeProps {
  pages: Page[]
  currentPageId: string
  onSelectPage: (pageId: string) => void
  onAddPage: (parentId: string | null) => void
  onDeletePage: (pageId: string) => void
  onRenamePage: (pageId: string, newName: string) => void
}

interface PageTreeItemProps {
  page: Page
  level: number
  currentPageId: string
  onSelectPage: (pageId: string) => void
  onAddPage: (parentId: string) => void
  onDeletePage: (pageId: string) => void
  onRenamePage: (pageId: string, newName: string) => void
}

function PageTreeItem({
  page,
  level,
  currentPageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onRenamePage,
}: PageTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(page.name)
  const hasChildren = page.children && page.children.length > 0
  const isSelected = page.id === currentPageId
  const isHome = page.path === '/'

  const handleDoubleClick = () => {
    if (!page.locked) {
      setIsEditing(true)
      setEditName(page.name)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditName(page.name)
    }
  }

  const handleSave = () => {
    const trimmedName = editName.trim()
    if (trimmedName && trimmedName !== page.name) {
      onRenamePage(page.id, trimmedName)
    }
    setIsEditing(false)
  }

  return (
    <div>
      <div
        className={`flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent ${
          isSelected ? 'bg-accent' : ''
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-accent-foreground/10 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            {isHome ? (
              <Home className="h-4 w-4 text-muted-foreground" />
            ) : (
              <FileText className="h-4 w-4 text-muted-foreground" />
            )}
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              autoFocus
              className="flex-1 px-1 py-0.5 text-sm bg-background border rounded focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        ) : (
          <button
            onClick={() => onSelectPage(page.id)}
            onDoubleClick={handleDoubleClick}
            className="flex items-center gap-2 flex-1 text-left text-sm"
          >
            {isHome ? (
              <Home className="h-4 w-4 text-muted-foreground" />
            ) : (
              <FileText className="h-4 w-4 text-muted-foreground" />
            )}
            <span className={isSelected ? 'font-medium' : ''}>
              {page.name}
            </span>
            {page.locked && (
              <span className="text-xs text-muted-foreground">(locked)</span>
            )}
          </button>
        )}

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddPage(page.id)}
            className="h-6 w-6 p-0"
            title="Add subpage"
          >
            <Plus className="h-3 w-3" />
          </Button>
          {!page.locked && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeletePage(page.id)}
              className="h-6 w-6 p-0 hover:text-destructive"
              title="Delete page"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {page.children!.map((child) => (
            <PageTreeItem
              key={child.id}
              page={child}
              level={level + 1}
              currentPageId={currentPageId}
              onSelectPage={onSelectPage}
              onAddPage={onAddPage}
              onDeletePage={onDeletePage}
              onRenamePage={onRenamePage}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function PageTree({
  pages,
  currentPageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onRenamePage,
}: PageTreeProps) {
  return (
    <div className="border-r bg-muted/30 h-full flex flex-col">
      <div className="border-b p-4 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-sm">Pages</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddPage(null)}
            className="h-7"
          >
            <Plus className="h-3 w-3 mr-1" />
            New Page
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Manage your site pages (double-click to rename)
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {pages.map((page) => (
          <PageTreeItem
            key={page.id}
            page={page}
            level={0}
            currentPageId={currentPageId}
            onSelectPage={onSelectPage}
            onAddPage={onAddPage}
            onDeletePage={onDeletePage}
            onRenamePage={onRenamePage}
          />
        ))}
      </div>
    </div>
  )
}
