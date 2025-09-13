import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrackOrderSection } from "@/components/track-order-section"
import { CalculateDeliverySection } from "@/components/calculate-delivery-section"
import { FeaturesSection } from "@/components/features-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrackOrderSection />
        <CalculateDeliverySection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
