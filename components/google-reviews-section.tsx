"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Award, ThumbsUp, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function GoogleReviewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: Star,
      value: "4.9/5",
      label: "Note moyenne",
      delay: "delay-100",
    },
    {
      icon: Users,
      value: "500+",
      label: "Clients satisfaits",
      delay: "delay-200",
    },
    {
      icon: Award,
      value: "100%",
      label: "Qualité garantie",
      delay: "delay-300",
    },
    {
      icon: ThumbsUp,
      value: "98%",
      label: "Recommandations",
      delay: "delay-400",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Découvrez les avis authentiques de nos clients sur Google
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`text-center hover:shadow-xl hover:scale-110 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${stat.delay}`}
            >
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 hover:rotate-12 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1 hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground max-w-3xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 p-4 rounded-full animate-pulse hover:animate-spin transition-all duration-300">
                  <Star className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Consultez nos avis Google</h3>
              <p className="text-lg mb-6 opacity-90 text-pretty">
                Découvrez les témoignages authentiques de nos clients sur notre fiche Google Business. Leurs expériences
                reflètent notre engagement pour votre satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300"
                >
                  <Link
                    href="https://share.google/E9VrKOQ1vHISy1edA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Voir nos avis Google
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300"
                >
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-75">Vous êtes client ? Laissez-nous votre avis sur Google !</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
