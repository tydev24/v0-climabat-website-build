import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Company Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
              À propos de Climabat.34
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
            <div className="mt-4 sm:mt-6">
              <Button asChild size="lg" className="text-sm sm:text-base">
                <Link href="/a-propos">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <img
                src="/images/installation-climatisation-murale.jpg"
                alt="Installation climatisation murale"
                className="rounded-lg shadow-lg w-full aspect-video object-cover"
              />
              <img
                src="/images/pompe-chaleur-air-eau.jpg"
                alt="Pompe à chaleur air-eau"
                className="rounded-lg shadow-lg w-full aspect-video object-cover"
              />
              <img
                src="/images/vmc-double-flux-installation.jpg"
                alt="Installation VMC double flux"
                className="rounded-lg shadow-lg w-full aspect-video object-cover col-span-2"
              />
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
            Pourquoi nous choisir ?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Des valeurs qui font la différence dans chaque intervention
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Qualité Garantie</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Équipements de marques reconnues et respect des normes les plus strictes
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Proximité</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Une équipe locale qui connaît les spécificités de l'Hérault
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Expertise</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                15+ ans d'expérience et formation continue aux dernières technologies
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-primary text-primary-foreground rounded-lg p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm opacity-90">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">15+</div>
              <div className="text-xs sm:text-sm opacity-90">Années d'expérience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">7j/7</div>
              <div className="text-xs sm:text-sm opacity-90">Disponibilité</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm opacity-90">Hérault couvert</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
