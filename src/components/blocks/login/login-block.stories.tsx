import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LoginBlock } from '@/components/blocks/login/login-block'

/**
 * A complete login block component featuring a login form with a decorative image panel.
 * Combines the login form with responsive layout and terms of service links.
 */
const meta = {
  title: 'blocks/LoginBlock',
  component: LoginBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A full login block that includes the login form alongside a decorative image panel. Features responsive design that hides the image on mobile devices.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the login block',
    },
  },
} satisfies Meta<typeof LoginBlock>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default login block with form and image panel.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <LoginBlock {...args} />
    </div>
  ),
}
