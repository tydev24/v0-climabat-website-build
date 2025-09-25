import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Wrench, Phone, FileText, Euro } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contrat d'entretien - Climabat.34 | Maintenance préventive dans l'Hérault",
  description:
    "Souscrivez à un contrat d'entretien Climabat.34 pour vos équipements de chauffage, climatisation et ventilation. Maintenance préventive, interventions prioritaires et tarifs préférentiels.",
}

export default function ContratEntretienPage() {
  const avantages = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Équipements protégés",
      description: "Maintenance préventive pour prolonger la durée de vie de vos installations",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Interventions prioritaires",
      description: "Dépannage en urgence avec intervention prioritaire 7j/7",
    },
    {
      icon: <Euro className="h-6 w-6 text-primary" />,
      title: "Tarifs préférentiels",
      description: "Remises sur les pièces détachées et main d'œuvre",
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Suivi personnalisé",
      description: "Carnet d'entretien et historique des interventions",
    },
  ]

  const formules = [
    {
      name: "Formule Essentielle",
      price: "Sur devis", // Replaced price with "Sur devis"
      description: "Pour les particuliers",
      features: [
        "1 visite d'entretien annuelle",
        "Vérification complète des équipements",
        "Nettoyage et réglages",
        "Rapport d'intervention détaillé",
        "Conseils d'optimisation",
      ],
      badge: "Particuliers",
    },
    {
      name: "Formule Confort",
      price: "Sur devis", // Replaced price with "Sur devis"
      description: "Pour une tranquillité totale",
      features: [
        "2 visites d'entretien par an",
        "Intervention prioritaire en cas de panne",
        "Remise de 10% sur les pièces",
        "Assistance téléphonique",
        "Garantie pièces et main d'œuvre",
      ],
      badge: "Recommandée",
      popular: true,
    },
    {
      name: "Formule Professionnelle",
      price: "Sur devis",
      description: "Pour les professionnels et copropriétés",
      features: [
        "Visites programmées selon vos besoins",
        "Intervention d'urgence 24h/24",
        "Remise de 15% sur les pièces",
        "Suivi technique personnalisé",
        "Contrat sur mesure",
      ],
      badge: "Professionnels",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 relative"
        style={{
          backgroundImage: "url(/images/maintenance-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Maintenance préventive</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Contrat d'entretien</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Protégez vos équipements et garantissez leur performance avec nos contrats d'entretien sur mesure.
              Maintenance préventive, interventions prioritaires et tranquillité d'esprit assurée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/rendez-vous">Souscrire un contrat</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pourquoi choisir un contrat d'entretien ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un entretien régulier permet d'optimiser les performances, réduire les pannes et prolonger la durée de vie
              de vos équipements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((avantage, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{avantage.icon}</div>
                  <CardTitle className="text-lg">{avantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{avantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos formules d'entretien</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez la formule qui correspond le mieux à vos besoins et à votre budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {formules.map((formule, index) => (
              <Card key={index} className={`relative ${formule.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {formule.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Plus populaire</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {formule.badge}
                  </Badge>
                  <CardTitle className="text-xl">{formule.name}</CardTitle>
                  <CardDescription>{formule.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary mt-2">{formule.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {formule.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={formule.popular ? "default" : "outline"} asChild>
                    <Link href="/rendez-vous">Choisir cette formule</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Wrench className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Prêt à protéger vos équipements ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez-nous dès aujourd'hui pour souscrire à un contrat d'entretien adapté à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="tel:0748295492">
                  <Phone className="h-5 w-5 mr-2" />
                  07 48 29 54 92
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
