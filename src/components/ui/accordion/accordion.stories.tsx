import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
    Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger
} from '@/components/ui/accordion/accordion'

/**
 * A vertically stacked set of interactive headings that each reveal a section of content.
 */
const meta = {
  title: 'ui/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <div className="w-[400px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default accordion allows only one item to be open at a time.
 */
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
}

/**
 * Multiple items can be open at the same time.
 */
export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
}

/**
 * Single accordion that cannot be collapsed when an item is open.
 */
export const NonCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: false,
  },
}

/**
 * Accordion with a default value set.
 */
export const WithDefaultValue: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-2',
  },
}
