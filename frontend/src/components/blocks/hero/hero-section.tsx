'use client'

import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { Button } from '@/components/ui'
import type { ComponentConfig } from '@measured/puck'
import Link from 'next/link'

export interface HeroSectionProps {
  title: string
  subtitle: string
  primaryButtonText: string
  primaryButtonHref: string
  secondaryButtonText: string
  secondaryButtonHref: string
}

export function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: HeroSectionProps) {
  return (
    <section>
      <div className="relative py-24 md:py-36">
        <div className="text-center sm:mx-auto lg:mt-0 lg:mr-auto">
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="mt-8 text-6xl text-balance md:text-7xl lg:mt-16 xl:text-[5.25rem]"
          >
            {title}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.5}
            as="p"
            className="mx-auto mt-8 text-lg text-balance"
          >
            {subtitle}
          </TextEffect>

          <AnimatedGroup
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 1.2,
                    type: 'spring',
                    bounce: 0.3,
                  },
                },
              },
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            <div
              key={1}
              className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
            >
              <Button asChild size="lg" className="rounded-xl px-5 text-base">
                <Link href={primaryButtonHref}>
                  <span className="whitespace-nowrap">{primaryButtonText}</span>
                </Link>
              </Button>
            </div>
            <Button
              key={2}
              asChild
              size="lg"
              variant="outline"
              className="h-[2.625rem] rounded-xl px-5"
            >
              <Link href={secondaryButtonHref}>
                <span className="whitespace-nowrap">{secondaryButtonText}</span>
              </Link>
            </Button>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  )
}

// Puck configuration
export const heroSectionConfig: ComponentConfig<HeroSectionProps> = {
  fields: {
    title: { type: 'text' },
    subtitle: { type: 'textarea' },
    primaryButtonText: { type: 'text' },
    primaryButtonHref: { type: 'text' },
    secondaryButtonText: { type: 'text' },
    secondaryButtonHref: { type: 'text' },
  },
  defaultProps: {
    title: 'Modern Solutions for Customer Engagement',
    subtitle:
      'Highly customizable components for building modern websites and applications that look and feel the way you mean it.',
    primaryButtonText: 'Start Building',
    primaryButtonHref: '#',
    secondaryButtonText: 'Request a demo',
    secondaryButtonHref: '#',
  },
  render: (props) => <HeroSection {...props} />,
}
