import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Thermometer, Wind, Wrench, Settings, Shield, Clock, Phone, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Thermometer,
      title: "Chauffage",
      description: "Installation, maintenance et dépannage de tous types de systèmes de chauffage",
      features: [
        "Chaudières gaz et fioul",
        "Pompes à chaleur air/eau",
        "Radiateurs et plancher chauffant",
        "Cheminées et poêles",
        "Maintenance préventive",
      ],
      href: "/services/chauffage",
    },
    {
      icon: Wind,
      title: "Climatisation",
      description: "Solutions de climatisation adaptées à vos besoins et votre budget",
      features: [
        "Climatisation réversible",
        "Systèmes multi-split",
        "Climatisation gainable",
        "Pompes à chaleur air/air",
        "Entretien annuel",
      ],
      href: "/services/climatisation",
    },
    {
      icon: Wrench,
      title: "Ventilation",
      description: "Systèmes de ventilation pour un air sain et une meilleure qualité de vie",
      features: [
        "VMC simple et double flux",
        "Ventilation mécanique",
        "Extracteurs d'air",
        "Purificateurs d'air",
        "Diagnostic qualité air",
      ],
      href: "/services/ventilation",
    },
  ]

  const additionalServices = [
    {
      icon: Settings,
      title: "Maintenance",
      description: "Contrats d'entretien pour prolonger la durée de vie de vos équipements",
    },
    {
      icon: Shield,
      title: "Dépannage",
      description: "Intervention rapide 7j/7 pour tous vos problèmes de chauffage et climatisation",
    },
    {
      icon: Clock,
      title: "Urgence",
      description: "Service d'urgence 24h/24 pour les pannes critiques",
    },
  ]

  return (
    <main>
      {/* Hero section */}
      <section
        className="relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-12 sm:py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/professional-hvac-installation-modern-home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6 text-white">
              Nos services de
              <span className="text-primary"> confort thermique</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 text-pretty mb-8 leading-relaxed">
              Découvrez notre gamme complète de services pour votre chauffage, climatisation et ventilation dans
              l'Hérault. Solutions professionnelles avec garantie et intervention rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
              >
                <Link href="/contact">Devis gratuit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main services */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Nos spécialités</h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
              Des solutions complètes pour tous vos besoins en confort thermique
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section
        className="relative bg-muted/30 py-12 sm:py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/modern-hvac-equipment-installation.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Services complémentaires</h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
              Un accompagnement complet pour la longévité de vos équipements
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-pretty">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Pourquoi faire confiance à Climabat.34 ?</h2>
              <div className="space-y-4">
                {[
                  "Plus de 15 ans d'expérience dans l'Hérault",
                  "Techniciens certifiés et qualifiés",
                  "Matériel de qualité professionnelle",
                  "Garantie sur tous nos travaux",
                  "Devis gratuit et transparent",
                  "Intervention rapide 7j/7",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 sm:p-8 text-center">
                <Phone className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Besoin d'un conseil ?</h3>
                <p className="mb-6 opacity-90 text-sm sm:text-base">
                  Nos experts sont à votre disposition pour vous conseiller et établir un devis personnalisé gratuit.
                </p>
                <div className="space-y-3">
                  <Button variant="secondary" size="lg" className="w-full" asChild>
                    <Link href="tel:0748295492">07 48 29 54 92</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    <Link href="/contact">Demander un devis</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
