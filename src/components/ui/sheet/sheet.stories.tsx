import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
    Sheet,  SheetClose,  SheetContent,  SheetDescription,  SheetFooter,  SheetHeader,  SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet/sheet'

/**
 * Extends the Dialog component to display content that complements the main content of the screen.
 */
const meta = {
  title: 'ui/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default sheet opens from the right side.
 */
export const Default: Story = {}

/**
 * Sheet that opens from the left side.
 */
export const Left: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>This sheet opens from the left side of the screen.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-2">
            <a href="#" className="hover:bg-accent block rounded px-4 py-2">
              Home
            </a>
            <a href="#" className="hover:bg-accent block rounded px-4 py-2">
              About
            </a>
            <a href="#" className="hover:bg-accent block rounded px-4 py-2">
              Services
            </a>
            <a href="#" className="hover:bg-accent block rounded px-4 py-2">
              Contact
            </a>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet that opens from the top.
 */
export const Top: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>This sheet opens from the top of the screen.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>This is a notification or alert that slides down from the top.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet that opens from the bottom.
 */
export const Bottom: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Actions</SheetTitle>
          <SheetDescription>This sheet opens from the bottom of the screen.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Share
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Copy Link
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Download
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}
