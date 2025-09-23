import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Wind, Leaf, Shield, Home, CheckCircle, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"

export default function VentilationPage() {
  const ventilationTypes = [
    {
      icon: Wind,
      title: "VMC Simple flux",
      description: "Ventilation mécanique contrôlée économique",
      features: ["Installation simple", "Économique", "Fiable"],
      price: "À partir de 800€",
    },
    {
      icon: Zap,
      title: "VMC Double flux",
      description: "Récupération de chaleur et économies d'énergie",
      features: ["Récupération 90%", "Filtration air", "Très économique"],
      price: "À partir de 2 500€",
    },
    {
      icon: Home,
      title: "Ventilation naturelle",
      description: "Solutions passives pour une ventilation douce",
      features: ["Sans électricité", "Silencieuse", "Écologique"],
      price: "À partir de 300€",
    },
    {
      icon: Shield,
      title: "Purificateurs d'air",
      description: "Amélioration de la qualité de l'air intérieur",
      features: ["Filtres HEPA", "Anti-allergènes", "Contrôle qualité"],
      price: "À partir de 500€",
    },
  ]

  const benefits = [
    "Air sain et renouvelé en permanence",
    "Élimination de l'humidité excessive",
    "Réduction des allergènes",
    "Économies d'énergie importantes",
    "Conformité réglementaire RT2012",
    "Installation et maintenance incluses",
  ]

  return (
    <main>
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Accueil
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/services" className="text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Ventilation</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux services
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold">Ventilation</h1>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                Spécialiste des systèmes de ventilation dans l'Hérault. Solutions pour un air sain et une meilleure
                qualité de vie dans votre habitation.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-medium">Air pur</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="font-medium">Santé</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Devis gratuit</Link>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Bénéfices de la ventilation</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventilation types */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos solutions de ventilation</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              De la VMC simple flux aux purificateurs, respirez mieux chez vous
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ventilationTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground text-pretty">{type.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {type.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <Leaf className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Respirez un air plus sain</h2>
              <p className="text-xl mb-8 opacity-90">
                Nos experts vous conseillent sur la meilleure solution de ventilation pour votre habitation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
