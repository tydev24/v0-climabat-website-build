"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Thermometer, Wind, Wrench, Shield, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const heroSlides = [
    {
      id: 1,
      backgroundImage: "/images/climatisation-moderne-salon.jpg",
      title: "Climatisation",
      subtitle: "Solutions de refroidissement",
      description:
        "Profitez d'un confort optimal toute l'année avec nos systèmes de climatisation performants et économiques. Installation, maintenance et dépannage par nos experts certifiés.",
      primaryButton: { text: "Devis climatisation", href: "/contact" },
      secondaryButton: { text: "Nos réalisations", href: "/realisations" },
      features: [
        { icon: Wind, title: "Climatisation réversible", description: "Chaud et froid en un seul système" },
        { icon: Shield, title: "Économies d'énergie", description: "Jusqu'à 30% d'économies sur vos factures" },
        { icon: Wrench, title: "Installation rapide", description: "Mise en service en 24h" },
      ],
    },
    {
      id: 2,
      backgroundImage: "/images/chauffage-radiateur-moderne.jpg",
      title: "Chauffage",
      subtitle: "Chaleur et confort",
      description:
        "Systèmes de chauffage modernes et efficaces pour votre maison. Pompes à chaleur, radiateurs, planchers chauffants - nous avons la solution adaptée à vos besoins.",
      primaryButton: { text: "Devis chauffage", href: "/contact" },
      secondaryButton: { text: "Prendre RDV", href: "/rendez-vous" },
      features: [
        { icon: Thermometer, title: "Pompe à chaleur", description: "Solution écologique et économique" },
        { icon: Shield, title: "Plancher chauffant", description: "Confort optimal et discret" },
        { icon: Clock, title: "Dépannage 7j/7", description: "Intervention rapide garantie" },
      ],
    },
    {
      id: 3,
      backgroundImage: "/images/ventilation-vmc-installation.jpg",
      title: "Ventilation",
      subtitle: "Air pur et sain",
      description:
        "Systèmes de ventilation pour renouveler l'air de votre habitat. VMC simple flux, double flux, ventilation naturelle - pour un air toujours pur et sain.",
      primaryButton: { text: "Devis ventilation", href: "/contact" },
      secondaryButton: { text: "En savoir plus", href: "/a-propos" },
      features: [
        { icon: Wind, title: "VMC double flux", description: "Récupération de chaleur optimisée" },
        { icon: Shield, title: "Air purifié", description: "Filtration des allergènes et polluants" },
        { icon: Wrench, title: "Maintenance incluse", description: "Entretien régulier de vos équipements" },
      ],
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 7000) // Increased to 7 seconds for better UX

    return () => clearInterval(interval)
  }, [currentSlide, isAutoPlaying])

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 600) // Slightly longer animation
  }, [isAnimating, heroSlides.length])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, heroSlides.length])

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 600)
    },
    [isAnimating, currentSlide],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const currentSlideData = heroSlides[currentSlide]

  const advantages = [
    {
      icon: Shield,
      title: "Garantie qualité",
      description: "Travaux garantis et certifiés",
    },
    {
      icon: Clock,
      title: "Intervention rapide",
      description: "Dépannage 7j/7 dans l'Hérault",
    },
    {
      icon: MapPin,
      title: "Proximité",
      description: "Entreprise locale de confiance",
    },
  ]

  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        <div
          className={`relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-6 sm:py-12 md:py-16 lg:py-24 transition-all duration-700 ease-in-out ${
            isAnimating ? "opacity-95" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url('${currentSlideData.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/85 to-background/80"></div>

          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground p-1 sm:p-2 md:p-3 rounded-full transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground p-1 sm:p-2 md:p-3 rounded-full transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105"
            aria-label="Slide suivant"
          >
            <ChevronRight className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
              <div
                className={`text-center lg:text-left transition-all duration-600 ease-out ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <span className="text-primary font-semibold text-xs sm:text-sm md:text-base lg:text-lg bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                    {currentSlideData.subtitle}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance mb-2 sm:mb-4 md:mb-6 leading-tight">
                  {currentSlideData.title} dans l'
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Hérault
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-pretty mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl">
                  {currentSlideData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    asChild
                    className="text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href={currentSlideData.primaryButton.href}>{currentSlideData.primaryButton.text}</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300"
                  >
                    <Link href={currentSlideData.secondaryButton.href}>{currentSlideData.secondaryButton.text}</Link>
                  </Button>
                </div>
              </div>

              <div
                className={`grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 transition-all duration-600 ease-out delay-150 ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                {currentSlideData.features.map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-card/90 backdrop-blur-sm border-border/50 hover:shadow-lg hover:bg-card/95 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="bg-primary/10 p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-lg shrink-0">
                          <feature.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-0.5 sm:mb-1 md:mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-pretty leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125 shadow-lg"
                    : "bg-background/60 hover:bg-background/80 hover:scale-110"
                }`}
                aria-label={`Aller au slide ${index + 1}: ${slide.title}`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-background/20">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-muted/30 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
              Pourquoi choisir Climabat.34 ?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Une expertise reconnue au service de votre confort
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <advantage.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">
                  {advantage.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-pretty">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
