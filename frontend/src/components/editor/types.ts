import type { Data } from '@measured/puck'

export interface Page {
  id: string
  name: string
  path: string
  content: Data
  children?: Page[]
  locked?: boolean // dla home i stron które nie mogą być usunięte
}

export interface PageTreeData {
  pages: Page[]
  currentPageId: string
}
