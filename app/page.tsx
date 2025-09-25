import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GoogleReviewsSection } from "@/components/google-reviews-section"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: "url('/images/climabat-background-pattern.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      <HeroSection />
      <AboutSection />
      <GoogleReviewsSection />
    </main>
  )
}
