import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RegisterBlock } from '@/components/blocks/register/register-block'

/**
 * A complete registration block component featuring a registration form with a decorative image panel.
 * Combines the registration form with responsive layout and terms of service links.
 */
const meta = {
  title: 'blocks/RegisterBlock',
  component: RegisterBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A full registration block that includes the registration form alongside a decorative image panel. Features responsive design that hides the image on mobile devices.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the registration block',
    },
  },
} satisfies Meta<typeof RegisterBlock>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default registration block with form and image panel.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <RegisterBlock {...args} />
    </div>
  ),
}
