import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroSection from '@/components/blocks/hero/hero-section'

/**
 * A hero section component with animated text effects and call-to-action buttons.
 * Features modern text animations, staggered button animations, and responsive design.
 */
const meta = {
  title: 'blocks/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A modern hero section with animated text effects and gradient button styling. Perfect for landing pages and marketing sites.',
      },
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default hero section with animated text and call-to-action buttons.
 */
export const Default: Story = {}
