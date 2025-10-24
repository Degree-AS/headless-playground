import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../form'
import { InputField } from './input-field'

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

type FormData = z.infer<typeof schema>

const InputFieldDemo = (props: Record<string, unknown>) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', name: '' },
  })

  return (
    <Form {...form}>
      <form className="w-80 space-y-4">
        <InputField name={'name'} form={form} {...props} />
      </form>
    </Form>
  )
}

const meta: Meta<typeof InputFieldDemo> = {
  title: 'Form Elements/Input Field',
  component: InputFieldDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Email: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
}

export const WithDescription: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    description: 'We will never share your email with anyone else.',
  },
}

export const Required: Story = {
  args: {
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
}
