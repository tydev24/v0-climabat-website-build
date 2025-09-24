import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Flame, Zap, Leaf, Wrench, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChauffagePage() {
  const heatingTypes = [
    {
      icon: Flame,
      title: "Chaudières gaz",
      description: "Chaudières à condensation haute performance",
      features: ["Rendement jusqu'à 110%", "Économies d'énergie", "Fiabilité prouvée"],
    },
    {
      icon: Zap,
      title: "Pompes à chaleur",
      description: "Solutions écologiques et économiques",
      features: ["COP jusqu'à 5", "Éligible aux aides", "Chauffage + ECS"],
    },
    {
      icon: Thermometer,
      title: "Radiateurs",
      description: "Radiateurs haute performance et design",
      features: ["Chaleur douce", "Régulation précise", "Design moderne"],
    },
    {
      icon: Leaf,
      title: "Plancher chauffant",
      description: "Confort optimal et économies d'énergie",
      features: ["Chaleur uniforme", "Invisible", "Compatible RT2012"],
    },
  ]

  const services = [
    "Installation complète",
    "Mise en service",
    "Raccordements gaz et électriques",
    "Réglages et optimisation",
    "Formation à l'utilisation",
    "Garantie constructeur + travaux",
  ]

  return (
    <main>
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
            <span className="text-foreground">Chauffage</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux services
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Thermometer className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">Chauffage</h1>
              </div>
              <p className="text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                Spécialiste de l'installation et maintenance de systèmes de chauffage dans l'Hérault. Solutions
                performantes et économiques pour votre confort toute l'année.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Devis gratuit</Link>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Nos prestations incluses</h3>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heating types */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos solutions de chauffage</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Choisissez la solution qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {heatingTypes.map((type, index) => (
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
              <Wrench className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Prêt à améliorer votre confort ?</h2>
              <p className="text-xl mb-8 opacity-90">
                Nos experts vous accompagnent dans le choix et l'installation de votre nouveau système de chauffage.
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
