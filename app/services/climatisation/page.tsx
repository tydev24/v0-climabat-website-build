import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wind, Snowflake, Sun, Home, Building, Wrench, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"

export default function ClimatisationPage() {
  const climatisationTypes = [
    {
      icon: Wind,
      title: "Climatisation réversible",
      description: "Chauffage et climatisation en un seul système",
      features: ["Chaud et froid", "Économique", "Installation simple"],
      price: "À partir de 1 800€",
    },
    {
      icon: Home,
      title: "Multi-split",
      description: "Plusieurs unités intérieures, une unité extérieure",
      features: ["Jusqu'à 5 unités", "Réglage indépendant", "Design discret"],
      price: "À partir de 3 500€",
    },
    {
      icon: Building,
      title: "Climatisation gainable",
      description: "Solution invisible intégrée aux combles",
      features: ["Invisible", "Silencieuse", "Répartition uniforme"],
      price: "À partir de 4 500€",
    },
    {
      icon: Snowflake,
      title: "Pompe à chaleur air/air",
      description: "Solution écologique haute performance",
      features: ["COP élevé", "Éligible aux aides", "Très économique"],
      price: "À partir de 2 800€",
    },
  ]

  const advantages = [
    "Confort optimal été comme hiver",
    "Économies d'énergie importantes",
    "Installation rapide et propre",
    "Maintenance préventive incluse",
    "Garantie constructeur étendue",
    "Service après-vente réactif",
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
            <span className="text-foreground">Climatisation</span>
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
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Wind className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold">Climatisation</h1>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                Installation de systèmes de climatisation performants dans l'Hérault. Solutions adaptées à votre
                habitation pour un confort optimal toute l'année.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  <span className="font-medium">Été</span>
                </div>
                <div className="flex items-center gap-2">
                  <Snowflake className="h-5 w-5 text-accent" />
                  <span className="font-medium">Hiver</span>
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
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Nos avantages</h3>
              <div className="space-y-3">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm sm:text-base">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Climatisation types */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos solutions de climatisation</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Du système simple au multi-zones, trouvez la solution adaptée
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {climatisationTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <type.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground text-pretty">{type.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
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
          <Card className="bg-accent text-accent-foreground">
            <CardContent className="p-12">
              <Wrench className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Besoin de fraîcheur cet été ?</h2>
              <p className="text-xl mb-8 opacity-90">
                Nos techniciens qualifiés installent votre climatisation rapidement et dans les règles de l'art.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
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
