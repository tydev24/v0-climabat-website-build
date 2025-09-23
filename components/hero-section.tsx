import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Thermometer, Wind, Wrench, Shield, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const services = [
    {
      icon: Thermometer,
      title: "Chauffage",
      description: "Installation et maintenance de systèmes de chauffage performants",
    },
    {
      icon: Wind,
      title: "Climatisation",
      description: "Solutions de climatisation pour votre confort toute l'année",
    },
    {
      icon: Wrench,
      title: "Ventilation",
      description: "Systèmes de ventilation pour un air sain et renouvelé",
    },
  ]

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
      {/* Hero background */}
      <div
        className="relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-20 lg:py-32"
        style={{
          backgroundImage: `url('/modern-home-interior-with-heating-and-cooling-syst.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
                Votre confort thermique dans l'
                <span className="text-primary">Hérault</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                Expert en chauffage, climatisation et ventilation. Solutions sur-mesure pour votre maison ou entreprise
                avec
                <strong className="text-foreground"> intervention rapide</strong> et
                <strong className="text-foreground"> garantie qualité</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/contact">Devis gratuit</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                        <p className="text-muted-foreground text-pretty">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advantages section */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Climabat.34 ?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Une expertise reconnue au service de votre confort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-pretty">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
