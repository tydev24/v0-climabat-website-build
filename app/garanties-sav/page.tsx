import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, CheckCircle, Phone, FileText, Award, Wrench, HeadphonesIcon } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Garanties & SAV - Climabat.34 | Service après-vente dans l'Hérault",
  description:
    "Découvrez nos garanties et notre service après-vente Climabat.34. Interventions rapides, pièces garanties et support technique pour tous vos équipements de chauffage, climatisation et ventilation.",
}

export default function GarantiesSavPage() {
  const garanties = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Garantie installation",
      duration: "2 ans",
      description: "Toutes nos installations sont garanties 2 ans pièces et main d'œuvre",
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Garantie pièces",
      duration: "Selon fabricant",
      description: "Garantie constructeur respectée sur toutes les pièces détachées",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Garantie main d'œuvre",
      duration: "seulement 1 an",
      description: "Nos interventions sont garanties seulement 1 an pour votre tranquillité",
    },
  ]

  const services = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Intervention rapide",
      description: "Dépannage d'urgence 7j/7 avec intervention sous 24h",
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6 text-primary" />,
      title: "Support technique",
      description: "Assistance téléphonique et conseils d'experts",
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Suivi personnalisé",
      description: "Historique des interventions et carnet d'entretien",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Diagnostic gratuit",
      description: "Évaluation gratuite de vos équipements en cas de panne",
    },
  ]

  const engagements = [
    "Respect des délais d'intervention annoncés",
    "Transparence sur les tarifs et devis détaillés",
    "Utilisation de pièces d'origine ou équivalentes",
    "Formation continue de nos techniciens",
    "Respect des normes de sécurité en vigueur",
    "Satisfaction client garantie ou intervention gratuite",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 relative"
        style={{
          backgroundImage: "url(/images/warranty-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Service après-vente</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Garanties & SAV</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Votre tranquillité d'esprit est notre priorité. Découvrez nos garanties étendues et notre service
              après-vente réactif pour tous vos équipements de chauffage, climatisation et ventilation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contacter le SAV</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="tel:0748295492">
                  <Phone className="h-5 w-5 mr-2" />
                  Urgence 24h/24
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos garanties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons à vous offrir des garanties étendues pour votre sérénité et la protection de vos
              investissements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {garanties.map((garantie, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">{garantie.icon}</div>
                  <CardTitle className="text-xl">{garantie.title}</CardTitle>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    {garantie.duration}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{garantie.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services SAV */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre service après-vente</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un service client réactif et professionnel pour répondre à tous vos besoins d'assistance et de dépannage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-2 p-2 bg-primary/10 rounded-lg w-fit">{service.icon}</div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nos engagements qualité</h2>
              <p className="text-muted-foreground">
                Des promesses que nous tenons pour votre satisfaction et votre confiance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engagements.map((engagement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{engagement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact SAV */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Besoin d'assistance ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Notre équipe SAV est à votre disposition pour toute question ou intervention d'urgence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contacter le SAV</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-accent"
                asChild
              >
                <Link href="tel:0748295492">
                  <Phone className="h-5 w-5 mr-2" />
                  07 48 29 54 92
                </Link>
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">Disponible 7j/7 - Interventions d'urgence 24h/24</p>
          </div>
        </div>
      </section>
    </div>
  )
}
