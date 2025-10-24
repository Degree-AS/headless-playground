import { Button } from '@/components/ui/button/button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { toast } from 'sonner'
import { Toaster } from './sonner'

/**
 * Toast notifications using Sonner - an opinionated toast component for React.
 *
 * Sonner provides beautiful, accessible toast notifications with minimal setup.
 * It automatically handles positioning, stacking, animations, and theme integration.
 */
const meta = {
  title: 'ui/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sonner is a performant, accessible toast notification library. Features include automatic theme detection, promise-based toasts, customizable actions, and support for rich content.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[400px] items-center justify-center">
        <Story />
        <Toaster richColors />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

/**
 * All toast variants in one demo - click to see different types
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast.success('Account created successfully!')}>Success</Button>
      <Button onClick={() => toast.error('Failed to delete item')} variant="destructive">
        Error
      </Button>
      <Button onClick={() => toast.info('New updates available')} variant="outline">
        Info
      </Button>
      <Button
        onClick={() => toast.warning('Your session expires in 5 minutes')}
        variant="secondary"
      >
        Warning
      </Button>
      <Button onClick={() => toast('Event has been created')} variant="ghost">
        Default
      </Button>
    </div>
  ),
}
