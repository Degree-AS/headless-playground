/* eslint-disable @next/next/no-html-link-for-pages */
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
    NavigationMenu,  NavigationMenuContent,  NavigationMenuItem,  NavigationMenuLink,
    NavigationMenuList,  NavigationMenuTrigger
} from '@/components/ui/navigation-menu/navigation-menu'

/**
 * A collection of links for navigating websites.
 */
const meta = {
  title: 'ui/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-6 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink href="/docs">
                <div className="text-sm font-medium">Introduction</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/installation">
                <div className="text-sm font-medium">Installation</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  How to install dependencies and structure your app.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/primitives/typography">
                <div className="text-sm font-medium">Typography</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  Styles for headings, paragraphs, lists...etc
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuLink href="/docs/primitives/alert-dialog">
                <div className="text-sm font-medium">Alert Dialog</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  A modal dialog that interrupts the user with important content.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/primitives/hover-card">
                <div className="text-sm font-medium">Hover Card</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  For sighted users to preview content available behind a link.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/primitives/progress">
                <div className="text-sm font-medium">Progress</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  Displays an indicator showing the completion progress.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/primitives/scroll-area">
                <div className="text-sm font-medium">Scroll-area</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  Visually or semantically separates content.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} satisfies Meta<typeof NavigationMenu>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default navigation menu with dropdown content.
 */
export const Default: Story = {}

/**
 * A simple navigation menu with just links.
 */
export const Simple: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/**
 * Navigation menu without viewport (dropdown will be positioned relative to trigger).
 */
export const WithoutViewport: Story = {
  render: (args) => (
    <NavigationMenu {...args} viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] gap-3 p-4">
              <NavigationMenuLink href="/products/web">
                <div className="text-sm font-medium">Web Development</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  Build modern web applications
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/mobile">
                <div className="text-sm font-medium">Mobile Apps</div>
                <p className="text-muted-foreground text-sm leading-snug">
                  Create native mobile experiences
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/pricing"
            className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
