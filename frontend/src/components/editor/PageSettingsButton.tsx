'use client'

import { createUsePuck } from '@measured/puck'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui'

// Create typed usePuck hook
const usePuckSelector = createUsePuck()

export function PageSettingsButton() {
  // Use separate selectors for each value to avoid object reference issues
  const dispatch = usePuckSelector((state) => state.dispatch)
  const itemSelector = usePuckSelector((state) => state.appState.ui.itemSelector)

  const handleClick = () => {
    // Deselect current component to show page settings
    dispatch({
      type: 'setUi',
      ui: {
        itemSelector: null,
      },
    })
  }

  const isPageSettingsActive = !itemSelector

  return (
    <Button
      variant={isPageSettingsActive ? 'default' : 'outline'}
      size="sm"
      onClick={handleClick}
      className="gap-2"
    >
      <Settings className="h-4 w-4" />
      Page Settings
    </Button>
  )
}
