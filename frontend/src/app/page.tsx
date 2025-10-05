import { Hero } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features"
import { PricingSection } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { CTA } from "@/components/landing/cta"

export default function Landing() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  )
}