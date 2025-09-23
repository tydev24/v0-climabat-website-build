import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Award, ThumbsUp, ExternalLink } from "lucide-react"
import Link from "next/link"

export function GoogleReviewsSection() {
  const stats = [
    {
      icon: Star,
      value: "4.9/5",
      label: "Note moyenne",
    },
    {
      icon: Users,
      value: "500+",
      label: "Clients satisfaits",
    },
    {
      icon: Award,
      value: "15 ans",
      label: "D'expérience",
    },
    {
      icon: ThumbsUp,
      value: "98%",
      label: "Recommandations",
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Découvrez les avis authentiques de nos clients sur Google
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <Star className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Consultez nos avis Google</h3>
              <p className="text-lg mb-6 opacity-90 text-pretty">
                Découvrez les témoignages authentiques de nos clients sur notre fiche Google Business. Leurs expériences
                reflètent notre engagement pour votre satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link
                    href="https://share.google/E9VrKOQ1vHISy1edA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Voir nos avis Google
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/rendez-vous">Prendre rendez-vous</Link>
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-75">Vous êtes client ? Laissez-nous votre avis sur Google !</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
