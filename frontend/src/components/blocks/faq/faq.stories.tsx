import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import FAQ from '@/components/blocks/faq/faq'

/**
 * A frequently asked questions section with an accordion interface.
 * Features a sticky sidebar with title and description, and expandable FAQ items with icons.
 */
const meta = {
  title: 'blocks/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive FAQ section with a sticky sidebar and accordion-style questions. Each FAQ item includes an icon and can be expanded to show the answer.',
      },
    },
  },
} satisfies Meta<typeof FAQ>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default FAQ section with predefined questions and answers.
 */
export const Default: Story = {}
