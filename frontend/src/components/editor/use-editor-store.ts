import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Data } from '@measured/puck'
import type { Page } from './types'

// Default data for new pages
const getInitialPageData = (): Data => ({
  content: [],
  root: {},
})

// Default home page with hero block
const getInitialHomePageData = (): Data => ({
  content: [
    {
      type: 'HeroBlock',
      props: {
        id: 'hero-1',
        title: 'Modern Solutions for Customer Engagement',
        subtitle:
          'Highly customizable components for building modern websites and applications that look and feel the way you mean it.',
        primaryButtonText: 'Start Building',
        primaryButtonHref: '#',
        secondaryButtonText: 'Request a demo',
        secondaryButtonHref: '#',
      },
    },
  ],
  root: {},
})

// Default pages structure
const getDefaultPages = (): Page[] => [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    content: getInitialHomePageData(),
    locked: true,
    children: [],
  },
]

interface EditorStore {
  // State
  pages: Page[]
  currentPageId: string
  isLoaded: boolean

  // Actions
  setIsLoaded: (loaded: boolean) => void
  setCurrentPageId: (id: string) => void
  updatePageContent: (pageId: string, newData: Data) => void
  addPage: (parentId: string | null) => void
  deletePage: (pageId: string) => void
  renamePage: (pageId: string, newName: string) => void

  // Selectors
  getCurrentPage: () => Page | null
  findPage: (pageId: string, pageList?: Page[]) => Page | null
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      // Initial state
      pages: getDefaultPages(),
      currentPageId: 'home',
      isLoaded: false,

      // Actions
      setIsLoaded: (loaded) => set({ isLoaded: loaded }),

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
          content: getInitialPageData(),
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
          currentPageId:
            state.currentPageId === pageId ? 'home' : state.currentPageId,
        }))
      },

      renamePage: (pageId, newName) => {
        const renameInTree = (pageList: Page[]): Page[] => {
          return pageList.map((page) => {
            if (page.id === pageId) {
              return { ...page, name: newName }
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
