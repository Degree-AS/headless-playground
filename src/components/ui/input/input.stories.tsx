import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

/**
 * Displays a form input field. The user can enter and edit text.
 */
const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    placeholder: 'Enter text...',
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default input field.
 */
export const Default: Story = {}

/**
 * Input with a placeholder.
 */
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your email address',
  },
}

/**
 * Input with a default value.
 */
export const WithValue: Story = {
  args: {
    defaultValue: 'john.doe@example.com',
  },
}

/**
 * Input in an error state.
 */
export const WithError: Story = {
  args: {
    error: true,
    placeholder: 'This field has an error',
  },
}

/**
 * Disabled input field.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This input is disabled',
  },
}

/**
 * Email input type.
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'your@email.com',
  },
}

/**
 * Password input type.
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
}

/**
 * Number input type.
 */
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '123',
  },
}

/**
 * Input with a label.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="email">Email address</Label>
      <Input {...args} id="email" type="email" placeholder="your@email.com" />
    </div>
  ),
}
