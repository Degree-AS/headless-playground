import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

/**
 * Renders an accessible label associated with controls.
 */
const meta = {
  title: 'ui/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Label text',
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default label.
 */
export const Default: Story = {}

/**
 * Label with an associated input field.
 */
export const WithInput: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} htmlFor="email">
        Email address
      </Label>
      <Input id="email" type="email" placeholder="your@email.com" />
    </div>
  ),
  args: {
    children: 'Email address',
  },
}

/**
 * Label in a disabled state.
 */
export const Disabled: Story = {
  render: (args) => (
    <div className="group space-y-2" data-disabled="true">
      <Label {...args} htmlFor="disabled-input">
        Disabled field
      </Label>
      <Input id="disabled-input" disabled placeholder="This field is disabled" />
    </div>
  ),
  args: {
    children: 'Disabled field',
  },
}
