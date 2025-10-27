'use client'

import { usePuck } from '@measured/puck'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui'

export function PageSettingsButton() {
  const { dispatch, appState } = usePuck()

  const handleClick = () => {
    // Deselect current component to show page settings
    dispatch({
      type: 'setUi',
      ui: {
        itemSelector: null,
      },
    })
  }

  const isPageSettingsActive = !appState.ui.itemSelector

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
