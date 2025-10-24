import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Features from '@/components/blocks/features/features'

/**
 * A features section component showcasing three key benefits with icons and descriptions.
 * Features custom styled cards with decorative grid backgrounds and hover effects.
 */
const meta = {
  title: 'blocks/Features',
  component: Features,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A features section with three cards highlighting key benefits. Each card includes an icon, title, and description with custom styling and hover effects.',
      },
    },
  },
} satisfies Meta<typeof Features>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default features section with three feature cards.
 */
export const Default: Story = {}
