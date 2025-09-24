import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GoogleReviewsSection } from "@/components/google-reviews-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <GoogleReviewsSection />
    </main>
  )
}
