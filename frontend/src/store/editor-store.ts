import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import debounce from 'lodash/debounce'
import type { Data } from '@measured/puck'
import type { Page, PageData } from '@/components/editor/types'
import { generateSlug } from '@/utils'

/**
 * Creates initial page data with empty content
 * All pages start empty - users add blocks as needed
 */
const getInitialPageData = (name: string, slug?: string): PageData => ({
  content: [],
  root: {
    title: name,
    slug: slug ?? generateSlug(name),
    metaDescription: '',
    metaKeywords: '',
  },
})

/**
 * Default pages structure with home page
 */
const getDefaultPages = (): Page[] => [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    content: getInitialPageData('Home', ''), // Empty slug for home
    locked: true,
    children: [],
  },
]

interface EditorStore {
  // Page state
  pages: Page[]
  currentPageId: string

  // UI state
  isLoaded: boolean
  puckVersion: number
  lastExternalName: string | null
  debouncedRename: ReturnType<typeof debounce> | null

  // Page actions
  setCurrentPageId: (id: string) => void
  updatePageContent: (pageId: string, newData: Data) => void
  addPage: (parentId: string | null) => void
  deletePage: (pageId: string) => void
  renamePage: (pageId: string, newName: string) => void

  // UI actions
  setIsLoaded: (loaded: boolean) => void
  incrementPuckVersion: () => void
  updateLastExternalName: (name: string) => void
  resetPuckVersion: () => void
  initializeDebouncedRename: (
    renameFunction: (pageId: string, newName: string) => void
  ) => void

  // Selectors
  getCurrentPage: () => Page | null
  findPage: (pageId: string, pageList?: Page[]) => Page | null
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      // Initial page state
      pages: getDefaultPages(),
      currentPageId: 'home',

      // Initial UI state
      isLoaded: false,
      puckVersion: 0,
      lastExternalName: null,
      debouncedRename: null,

      // Page actions
      setCurrentPageId: (id) => set({ currentPageId: id }),

      updatePageContent: (pageId, newData) => {
        const updateInTree = (pageList: Page[]): Page[] => {
          return pageList.map((page) => {
            if (page.id === pageId) {
              return { ...page, content: newData }
            }
            if (page.children) {
              return { ...page, children: updateInTree(page.children) }
            }
            return page
          })
        }

        set((state) => ({
          pages: updateInTree(state.pages),
        }))
      },

      addPage: (parentId) => {
        const newPage: Page = {
          id: `page-${Date.now()}`,
          name: 'New Page',
          path: `/page-${Date.now()}`,
          content: getInitialPageData('New Page'),
          children: [],
        }

        set((state) => {
          if (parentId === null) {
            // Add as root page
            return {
              pages: [...state.pages, newPage],
              currentPageId: newPage.id,
            }
          } else {
            // Add as child
            const addToTree = (pageList: Page[]): Page[] => {
              return pageList.map((page) => {
                if (page.id === parentId) {
                  return {
                    ...page,
                    children: [...(page.children || []), newPage],
                  }
                }
                if (page.children) {
                  return { ...page, children: addToTree(page.children) }
                }
                return page
              })
            }

            return {
              pages: addToTree(state.pages),
              currentPageId: newPage.id,
            }
          }
        })
      },

      deletePage: (pageId) => {
        // Find all IDs that will be deleted (page and all its children)
        const getAllPageIds = (page: Page): string[] => {
          const ids = [page.id]
          if (page.children) {
            page.children.forEach((child) => {
              ids.push(...getAllPageIds(child))
            })
          }
          return ids
        }

        // Find the page being deleted to get all child IDs
        const pageToDelete = get().findPage(pageId)
        const deletedIds = pageToDelete ? getAllPageIds(pageToDelete) : [pageId]

        const deleteFromTree = (pageList: Page[]): Page[] => {
          return pageList
            .filter((page) => page.id !== pageId)
            .map((page) => {
              if (page.children) {
                return { ...page, children: deleteFromTree(page.children) }
              }
              return page
            })
        }

        set((state) => ({
          pages: deleteFromTree(state.pages),
          currentPageId: deletedIds.includes(state.currentPageId)
            ? 'home'
            : state.currentPageId,
        }))
      },

      renamePage: (pageId, newName) => {
        const renameInTree = (pageList: Page[]): Page[] => {
          return pageList.map((page) => {
            if (page.id === pageId) {
              // Keep existing root data, only update title
              return {
                ...page,
                name: newName,
                content: {
                  ...page.content,
                  root: {
                    ...page.content.root,
                    title: newName,
                  },
                },
              }
            }
            if (page.children) {
              return { ...page, children: renameInTree(page.children) }
            }
            return page
          })
        }

        set((state) => ({
          pages: renameInTree(state.pages),
        }))
      },

      // UI actions
      setIsLoaded: (loaded) => set({ isLoaded: loaded }),

      incrementPuckVersion: () =>
        set((state) => ({ puckVersion: state.puckVersion + 1 })),

      updateLastExternalName: (name) => set({ lastExternalName: name }),

      resetPuckVersion: () => set({ puckVersion: 0 }),

      initializeDebouncedRename: (renameFunction) => {
        const existing = get().debouncedRename
        if (existing) {
          existing.cancel()
        }

        const debouncedFn = debounce((pageId: string, newName: string) => {
          renameFunction(pageId, newName)
        }, 300)

        set({ debouncedRename: debouncedFn })
      },

      // Selectors
      findPage: (pageId, pageList) => {
        const pages = pageList || get().pages

        for (const page of pages) {
          if (page.id === pageId) return page
          if (page.children) {
            const found = get().findPage(pageId, page.children)
            if (found) return found
          }
        }
        return null
      },

      getCurrentPage: () => {
        const { currentPageId, findPage } = get()
        return findPage(currentPageId)
      },
    }),
    {
      name: 'puck-pages-data',
      partialize: (state) => ({
        pages: state.pages,
        currentPageId: state.currentPageId,
      }),
    }
  )
)

/**
 * Cleanup function to call on component unmount
 * Cancels any pending debounced rename operations
 */
export const cleanupEditor = () => {
  const { debouncedRename } = useEditorStore.getState()
  if (debouncedRename) {
    debouncedRename.cancel()
  }
}
