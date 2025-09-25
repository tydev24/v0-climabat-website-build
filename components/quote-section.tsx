"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Clock, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"

export function QuoteSection() {
  const benefits = [
    {
      icon: Calculator,
      title: "Devis gratuit",
      description: "Estimation précise sans engagement",
    },
    {
      icon: Clock,
      title: "Réponse rapide",
      description: "Réponse sous 24h maximum",
    },
    {
      icon: CheckCircle,
      title: "Sans engagement",
      description: "Aucune obligation d'achat",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Demandez votre{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              devis gratuit
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Obtenez une estimation personnalisée pour vos travaux de climatisation, chauffage ou ventilation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Benefits */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center md:text-left">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">Prêt à commencer votre projet ?</h3>
                  <p className="text-muted-foreground mb-6">
                    Contactez-nous dès maintenant pour recevoir votre devis personnalisé et gratuit
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    asChild
                    className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/contact">
                      <Calculator className="mr-2 h-5 w-5" />
                      Demander un devis gratuit
                    </Link>
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Ou appelez-nous au</span>
                    <a href="tel:0467123456" className="font-semibold text-primary hover:underline">
                      04 67 12 34 56
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
