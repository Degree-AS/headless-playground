import FAQ from '@/components/blocks/faq/faq'
import Features from '@/components/blocks/features/features'
import { HeroSection } from '@/components/blocks/hero/hero-section'

export default function Home() {
  return (
    <main>
      <HeroSection
        title="Modern Solutions for Customer Engagement"
        subtitle="Highly customizable components for building modern websites and applications that look and feel the way you mean it."
        primaryButtonText="Start Building"
        primaryButtonHref="#"
        secondaryButtonText="Request a demo"
        secondaryButtonHref="#"
      />
      <Features />
      <FAQ />
    </main>
  )
}
