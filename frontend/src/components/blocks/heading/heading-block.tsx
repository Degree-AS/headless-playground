'use client'

import { cn } from '@/lib/utils'
import type { ComponentConfig } from '@measured/puck'

export interface HeadingBlockProps {
  children: string
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  alignment: 'left' | 'center' | 'right'
  fontWeight: 'light' | 'normal' | 'semibold' | 'bold' | 'extrabold'
  marginTop: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  marginBottom: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function HeadingBlock({
  children,
  level,
  alignment = 'left',
  fontWeight = 'semibold',
  marginTop = 'md',
  marginBottom = 'md',
  className,
}: HeadingBlockProps) {
  const Tag = level

  // Base classes inspired by ShadCN typography
  const baseClasses = 'scroll-m-20 tracking-tight'

  // Level-specific classes (from ShadCN typography examples)
  const levelClasses = {
    h1: 'text-4xl font-extrabold text-balance lg:text-5xl',
    h2: 'border-b pb-2 text-3xl font-semibold transition-colors first:mt-0',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  }

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // Font weight classes
  const fontWeightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  }

  // Margin classes
  const marginTopClasses = {
    none: 'mt-0',
    sm: 'mt-2',
    md: 'mt-4',
    lg: 'mt-8',
    xl: 'mt-10',
  }

  const marginBottomClasses = {
    none: 'mb-0',
    sm: 'mb-2',
    md: 'mb-4',
    lg: 'mb-6',
    xl: 'mb-8',
  }

  return (
    <Tag
      className={cn(
        baseClasses,
        levelClasses[level],
        alignmentClasses[alignment],
        fontWeightClasses[fontWeight],
        marginTopClasses[marginTop],
        marginBottomClasses[marginBottom],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// Puck configuration
export const headingBlockConfig: ComponentConfig<HeadingBlockProps> = {
  fields: {
    children: {
      type: 'text',
      label: 'Text',
    },
    level: {
      type: 'select',
      label: 'Heading Level',
      options: [
        { label: 'H1 - Largest', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6 - Smallest', value: 'h6' },
      ],
    },
    alignment: {
      type: 'radio',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    fontWeight: {
      type: 'select',
      label: 'Font Weight',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Normal', value: 'normal' },
        { label: 'Semibold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extra Bold', value: 'extrabold' },
      ],
    },
    marginTop: {
      type: 'select',
      label: 'Margin Top',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    marginBottom: {
      type: 'select',
      label: 'Margin Bottom',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
  },
  defaultProps: {
    children: 'Edit me by clicking!',
    level: 'h2',
    alignment: 'left',
    fontWeight: 'semibold',
    marginTop: 'md',
    marginBottom: 'md',
  },
  render: (props) => <HeadingBlock {...props} />,
}
