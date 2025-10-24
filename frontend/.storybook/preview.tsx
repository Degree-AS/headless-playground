import type { Preview, Decorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../src/app/globals.css'

// Create a client for Storybook stories
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  decorators: [
    ((Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )) as Decorator,
  ],
}

export default preview
