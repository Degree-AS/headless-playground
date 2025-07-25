import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../form'
import { PasswordField } from './password-field'

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
})

type FormData = z.infer<typeof schema>

const PasswordFieldDemo = (props: Record<string, unknown>) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  return (
    <Form {...form}>
      <form className="w-80 space-y-4">
        <PasswordField name={'password'} form={form} {...props} />
      </form>
    </Form>
  )
}

const meta: Meta<typeof PasswordFieldDemo> = {
  title: 'Form Elements/Password Field',
  component: PasswordFieldDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
}

export const WithDescription: Story = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    description: 'Password must be at least 6 characters long.',
  },
}

export const ConfirmPassword: Story = {
  args: {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
}
