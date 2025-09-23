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
      title: "Installation pompe à chaleur air/eau",
      location: "Montpellier",
      date: "Décembre 2024",
      category: "chauffage",
      description:
        "Installation complète d'une pompe à chaleur air/eau haute performance dans une maison individuelle de 150m². Remplacement de l'ancienne chaudière fioul avec optimisation du circuit de chauffage existant.",
      images: ["/images/pac-exterieure.jpg", "/images/pac-interieure.jpg", "/images/tableau-commande.jpg"],
      details: {
        surface: "150m²",
        equipment: "Pompe à chaleur Daikin Altherma 11kW, ballon ECS 300L",
        duration: "2 jours",
        budget: "12 000€ - 15 000€",
      },
    },
    {
      id: "2",
      title: "Climatisation multi-split 4 zones",
      location: "Béziers",
      date: "Novembre 2024",
      category: "climatisation",
      description:
        "Installation d'un système de climatisation multi-split réversible pour une maison de 120m². 4 unités intérieures murales avec une unité extérieure silencieuse.",
      images: [
        "/images/multi-split-exterieur.jpg",
        "/images/unite-murale-salon.jpg",
        "/images/unite-murale-chambre.jpg",
        "/images/telecommande-clim.jpg",
      ],
      details: {
        surface: "120m²",
        equipment: "Mitsubishi Electric MSZ-LN 4x2.5kW + MXZ-4F72VF",
        duration: "1 jour",
        budget: "4 500€ - 6 000€",
      },
    },
    {
      id: "3",
      title: "VMC double flux avec récupération de chaleur",
      location: "Sète",
      date: "Octobre 2024",
      category: "ventilation",
      description:
        "Installation d'une VMC double flux dans une maison BBC neuve. Système avec récupération de chaleur 90% et filtration haute performance pour un air sain.",
      images: ["/images/caisson-vmc.jpg", "/images/reseau-gaines.jpg", "/images/bouches-extraction.jpg"],
      details: {
        surface: "140m²",
        equipment: "Atlantic Duocosy HR 300m³/h avec échangeur thermique",
        duration: "1 jour",
        budget: "3 000€ - 4 000€",
      },
    },
    {
      id: "4",
      title: "Rénovation chauffage central",
      location: "Nîmes",
      date: "Septembre 2024",
      category: "chauffage",
      description:
        "Rénovation complète du système de chauffage central avec remplacement de la chaudière gaz et mise aux normes de l'installation. Optimisation énergétique.",
      images: ["/images/chaudiere-gaz.jpg", "/images/radiateurs-performance.jpg", "/images/thermostat-connecte.jpg"],
      details: {
        surface: "180m²",
        equipment: "Chaudière Saunier Duval 25kW + 8 radiateurs aluminium",
        duration: "3 jours",
        budget: "8 000€ - 10 000€",
      },
    },
    {
      id: "5",
      title: "Climatisation gainable invisible",
      location: "Lunel",
      date: "Août 2024",
      category: "climatisation",
      description:
        "Installation d'une climatisation gainable dans les combles pour une solution invisible et silencieuse. Diffusion d'air par grilles encastrées au plafond.",
      images: ["/images/unite-gainable.jpg", "/images/grilles-diffusion.jpg", "/images/gaines-isolees.jpg"],
      details: {
        surface: "100m²",
        equipment: "Daikin FDXM50F gainable + réseau de gaines isolées",
        duration: "2 jours",
        budget: "5 500€ - 7 000€",
      },
    },
    {
      id: "6",
      title: "Plancher chauffant électrique",
      location: "Agde",
      date: "Juillet 2024",
      category: "chauffage",
      description:
        "Installation d'un plancher chauffant électrique dans une extension de maison. Solution confortable et économique avec régulation pièce par pièce.",
      images: ["/images/cables-chauffants.jpg", "/images/isolation-thermique.jpg", "/images/thermostat-digital.jpg"],
      details: {
        surface: "40m²",
        equipment: "Câbles chauffants Thermor + thermostats programmables",
        duration: "1 jour",
        budget: "2 000€ - 3 000€",
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
