import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Thermometer, Wind, Wrench, Search, Filter, Award, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RealisationsPage() {
  const projects = [
    {
      id: "1",
      title: "Projet à venir",
      location: "À définir",
      date: "Prochainement",
      category: "chauffage",
      description:
        "Espace réservé pour vos futures réalisations de chauffage. Vous pourrez ajouter ici les détails de vos projets.",
      images: [],
      details: {
        surface: "À définir",
        equipment: "À définir",
        duration: "À définir",
      },
    },
    {
      id: "2",
      title: "Projet à venir",
      location: "À définir",
      date: "Prochainement",
      category: "climatisation",
      description:
        "Espace réservé pour vos futures réalisations de climatisation. Vous pourrez ajouter ici les détails de vos projets.",
      images: [],
      details: {
        surface: "À définir",
        equipment: "À définir",
        duration: "À définir",
      },
    },
    {
      id: "3",
      title: "Projet à venir",
      location: "À définir",
      date: "Prochainement",
      category: "ventilation",
      description:
        "Espace réservé pour vos futures réalisations de ventilation. Vous pourrez ajouter ici les détails de vos projets.",
      images: [],
      details: {
        surface: "À définir",
        equipment: "À définir",
        duration: "À définir",
      },
    },
  ]

  const stats = [
    {
      icon: Award,
      value: "200+",
      label: "Projets réalisés",
    },
    {
      icon: Users,
      value: "500+",
      label: "Clients satisfaits",
    },
    {
      icon: CheckCircle,
      value: "100%",
      label: "Projets garantis",
    },
  ]

  const categories = [
    { value: "all", label: "Tous les projets", icon: null },
    { value: "chauffage", label: "Chauffage", icon: Thermometer },
    { value: "climatisation", label: "Climatisation", icon: Wind },
    { value: "ventilation", label: "Ventilation", icon: Wrench },
  ]

  return (
    <main>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">
              Nos réalisations dans l'
              <span className="text-primary">Hérault</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Découvrez nos projets de chauffage, climatisation et ventilation. Plus de 200 installations réussies avec
              la satisfaction de nos clients.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filtrer les projets</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un projet..." className="pl-10 w-full sm:w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        {category.icon && <category.icon className="h-4 w-4" />}
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="montpellier">Montpellier</SelectItem>
                  <SelectItem value="beziers">Béziers</SelectItem>
                  <SelectItem value="nimes">Nîmes</SelectItem>
                  <SelectItem value="sete">Sète</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Projets récents ({projects.length})</h2>
            <Badge variant="secondary">Mis à jour régulièrement</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Votre projet nous intéresse</h2>
              <p className="text-xl mb-8 opacity-90">
                Chaque installation est unique. Parlons de votre projet et trouvons ensemble la solution idéale.
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
