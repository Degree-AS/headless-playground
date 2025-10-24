'use client'

import { useNavigation } from '@/services/navigation/navigation.hooks'
import type { NavigationNode } from '@/services/navigation/navigation.types'
import { useMemo } from 'react'

type PageSelectorProps = {
  value: string
  onChangeAction: (value: string) => void
  name: string
}

export function PageSelector({ value, onChangeAction, name }: PageSelectorProps) {
  const { data: nodes, isLoading } = useNavigation(1)

  const pages = useMemo(() => {
    if (!nodes) return [{ label: '-- Custom URL --', value: 'custom' }]

    const flattenPages = (
      items: NavigationNode[],
      prefix = '',
    ): Array<{ label: string; value: string }> => {
      return items.flatMap((node) => {
        const current = {
          label: prefix + node.name,
          value: node.pageId.toString(),
        }
        const children = node.nodes ? flattenPages(node.nodes, prefix + node.name + ' > ') : []
        return [current, ...children]
      })
    }

    return [{ label: '-- Custom URL --', value: 'custom' }, ...flattenPages(nodes)]
  }, [nodes])

  if (isLoading) {
    return (
      <div style={{ padding: '8px' }}>
        <label
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
        >
          Button Link
        </label>
        <div>Loading pages...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '8px' }}>
      <label
        htmlFor={name}
        style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}
      >
        Button Link
      </label>
      <select
        id={name}
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        {pages.map((page) => (
          <option key={page.value} value={page.value}>
            {page.label}
          </option>
        ))}
      </select>
    </div>
  )
}
