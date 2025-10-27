import type { Data } from '@measured/puck'

/**
 * Extended Data type with custom root fields for page metadata
 */
export interface PageData extends Data {
  root: Data['root'] & {
    slug?: string
    metaDescription?: string
    metaKeywords?: string
  }
}

export interface Page {
  id: string
  name: string
  path: string
  content: PageData
  children?: Page[]
  locked?: boolean // for home and pages that cannot be deleted
}

export interface PageTreeData {
  pages: Page[]
  currentPageId: string
}
