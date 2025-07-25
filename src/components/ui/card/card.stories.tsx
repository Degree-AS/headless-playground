import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BellIcon,  CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import {
    Card,  CardAction,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle
} from '@/components/ui/card/card'

/**
 * Displays a card with header, content, and footer.
 */
const meta = {
  title: 'ui/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Card content goes here. This is where you can put any content you want to display in the
          card.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default card with header, content, and footer.
 */
export const Default: Story = {}

/**
 * A card with an action button in the header.
 */
export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <BellIcon className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-4 w-4" />
            <span className="text-sm">Your order has been confirmed.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-4 w-4" />
            <span className="text-sm">Your payment has been processed.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * A simple card with just content.
 */
export const ContentOnly: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardContent>
        <p>This is a simple card with just content. No header or footer needed.</p>
      </CardContent>
    </Card>
  ),
}

/**
 * A card with header and content, but no footer.
 */
export const HeaderAndContent: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This card has a header and content, but no footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </CardContent>
    </Card>
  ),
}
