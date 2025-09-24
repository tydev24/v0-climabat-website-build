import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Company Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">À propos de Climabat.34</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Depuis plus de <strong className="text-foreground">15 ans</strong>, Climabat.34 s'impose comme votre
                partenaire de confiance pour tous vos besoins en chauffage, climatisation et ventilation dans l'Hérault.
              </p>
              <p>
                Notre entreprise familiale combine savoir-faire traditionnel et technologies modernes pour offrir des
                solutions de confort sur mesure, adaptées à chaque projet.
              </p>
              <p>
                Avec plus de <strong className="text-foreground">500 clients satisfaits</strong>, nous intervenons dans
                tout le département avec la même passion qu'au premier jour.
              </p>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/a-propos">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/hvac-company-team-working-on-installation.jpg"
              alt="Équipe Climabat.34 au travail"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Values Cards */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Pourquoi nous choisir ?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des valeurs qui font la différence dans chaque intervention
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Qualité Garantie</h4>
              <p className="text-muted-foreground">
                Équipements de marques reconnues et respect des normes les plus strictes
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Proximité</h4>
              <p className="text-muted-foreground">Une équipe locale qui connaît les spécificités de l'Hérault</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Expertise</h4>
              <p className="text-muted-foreground">
                15+ ans d'expérience et formation continue aux dernières technologies
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Années d'expérience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">7j/7</div>
              <div className="text-sm opacity-90">Disponibilité</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Hérault couvert</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
