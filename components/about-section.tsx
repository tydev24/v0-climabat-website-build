"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (statsRef.current) statsObserver.observe(statsRef.current)

    return () => {
      observer.disconnect()
      statsObserver.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Company Introduction */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
              À propos de Climabat.34
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p
                className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                Depuis plus de <strong className="text-foreground">15 ans</strong>, Climabat.34 s'impose comme votre
                partenaire de confiance pour tous vos besoins en chauffage, climatisation et ventilation dans l'Hérault.
              </p>
              <p
                className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                Notre entreprise familiale combine savoir-faire traditionnel et technologies modernes pour offrir des
                solutions de confort sur mesure, adaptées à chaque projet.
              </p>
              <p
                className={`transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                Avec plus de <strong className="text-foreground">500 clients satisfaits</strong>, nous intervenons dans
                tout le département avec la même passion qu'au premier jour.
              </p>
            </div>
            <div
              className={`mt-4 sm:mt-6 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <Button
                asChild
                size="lg"
                className="text-sm sm:text-base hover:scale-105 transition-transform duration-300"
              >
                <Link href="/a-propos">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <img
                src="/images/installation-climatisation-murale.jpg"
                alt="Installation climatisation murale"
                className="rounded-lg shadow-lg w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="/images/pompe-chaleur-air-eau.jpg"
                alt="Pompe à chaleur air-eau"
                className="rounded-lg shadow-lg w-full aspect-video object-cover hover:scale-105 transition-transform duration-500 delay-100"
              />
              <img
                src="/images/vmc-double-flux-installation.jpg"
                alt="Installation VMC double flux"
                className="rounded-lg shadow-lg w-full aspect-video object-cover col-span-2 hover:scale-105 transition-transform duration-500 delay-200"
              />
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
            Pourquoi nous choisir ?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Des valeurs qui font la différence dans chaque intervention
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {[
            {
              icon: CheckCircle,
              title: "Qualité Garantie",
              description: "Équipements de marques reconnues et respect des normes les plus strictes",
              delay: "delay-500",
            },
            {
              icon: Users,
              title: "Proximité",
              description: "Une équipe locale qui connaît les spécificités de l'Hérault",
              delay: "delay-600",
            },
            {
              icon: Award,
              title: "Expertise",
              description: "15+ ans d'expérience et formation continue aux dernières technologies",
              delay: "delay-700",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className={`text-center hover:shadow-xl hover:scale-105 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${item.delay}`}
            >
              <CardContent className="p-4 sm:p-6">
                <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4 hover:rotate-12 transition-transform duration-300" />
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`bg-primary text-primary-foreground rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-1000 ${statsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {[
              { value: "500+", label: "Clients satisfaits", delay: "delay-100" },
              { value: "15+", label: "Années d'expérience", delay: "delay-200" },
              { value: "7j/7", label: "Disponibilité", delay: "delay-300" },
              { value: "100%", label: "Hérault couvert", delay: "delay-400" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-700 hover:scale-110 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${stat.delay}`}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 animate-pulse">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
