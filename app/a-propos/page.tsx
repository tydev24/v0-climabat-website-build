import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/professional-hvac-technician-working-on-modern-hea.jpg')",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">À propos de Climabat.34</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance max-w-3xl mx-auto">
            Votre partenaire de confiance pour tous vos besoins en chauffage, climatisation et ventilation dans
            l'Hérault
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Notre Histoire</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondée il y a plus de 15 ans, Climabat.34 s'est imposée comme une référence dans le domaine du
                  chauffage, de la climatisation et de la ventilation dans l'Hérault.
                </p>
                <p>
                  Notre entreprise familiale a grandi grâce à notre engagement envers la qualité, l'innovation et la
                  satisfaction client. Nous combinons savoir-faire traditionnel et technologies modernes pour offrir des
                  solutions de confort sur mesure.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de compter plus de 500 clients satisfaits et d'intervenir dans tout le
                  département de l'Hérault avec la même passion qu'au premier jour.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/hvac-company-team-working-on-installation.jpg"
                alt="Équipe Climabat.34"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Nos Valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Qualité</h3>
                <p className="text-muted-foreground">
                  Nous utilisons uniquement des équipements de marques reconnues et respectons les normes les plus
                  strictes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Proximité</h3>
                <p className="text-muted-foreground">
                  Une équipe locale qui connaît les spécificités de notre région et reste à votre écoute.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                <p className="text-muted-foreground">
                  Plus de 15 ans d'expérience et une formation continue pour maîtriser les dernières technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-sm opacity-90">Intervention d'urgence</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Hérault couvert</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Certifications & Garanties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des labels de qualité qui témoignent de notre professionnalisme
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Badge variant="outline" className="text-lg p-3 mb-2">
                RGE
              </Badge>
              <p className="text-sm text-muted-foreground">Reconnu Garant Environnement</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-lg p-3 mb-2">
                QualiPAC
              </Badge>
              <p className="text-sm text-muted-foreground">Pompes à chaleur</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-lg p-3 mb-2">
                Qualibat
              </Badge>
              <p className="text-sm text-muted-foreground">Bâtiment certifié</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-lg p-3 mb-2">
                Garantie
              </Badge>
              <p className="text-sm text-muted-foreground">2 ans pièces & main d'œuvre</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Prêt à commencer votre projet ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
