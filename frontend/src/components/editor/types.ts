import type { Data } from '@measured/puck'

/**
 * Custom root props for page metadata (Puck v0.20+ format)
 */
export interface RootProps {
  title?: string
  slug?: string
  metaDescription?: string
  metaKeywords?: string
}

/**
 * Extended Data type with custom root fields for page metadata
 * Uses new Puck v0.20+ format with root.props
 */
export interface PageData extends Data {
  root: Data['root'] & {
    props?: RootProps
    // Legacy format support (old Puck versions)
    title?: string
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
