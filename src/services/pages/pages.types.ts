import type { Data } from '@measured/puck'

export type SavePageRequest = {
  pageId?: string
  slug: string
  title: string
  data: Data
}

export type SavePageResponse = {
  pageId: string
  slug: string
  title: string
  updatedAt: string
}
