import { AppointmentForm } from "@/components/appointment-form"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Phone, MapPin, Shield, CheckCircle } from "lucide-react"

export default function RendezVousPage() {
  const advantages = [
    {
      icon: Clock,
      title: "Intervention rapide",
      description: "Réponse sous 24h, intervention sous 48h",
    },
    {
      icon: Shield,
      title: "Devis gratuit",
      description: "Estimation transparente sans engagement",
    },
    {
      icon: CheckCircle,
      title: "Travaux garantis",
      description: "Garantie sur tous nos travaux et matériel",
    },
  ]

  const processSteps = [
    "Vous remplissez le formulaire",
    "Nous vous contactons sous 24h",
    "Nous planifions le rendez-vous",
    "Notre technicien intervient",
    "Devis gratuit sur place",
  ]

  return (
    <main>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">
              Prenez rendez-vous avec
              <span className="text-primary"> Climabat.34</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Intervention rapide dans tout l'Hérault pour vos besoins en chauffage, climatisation et ventilation. Devis
              gratuit et sans engagement.
            </p>
          </div>

          {/* Advantages */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground text-pretty">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm />
        </div>
      </section>

      {/* Process */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Un processus simple et transparent pour votre tranquillité
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {index + 1}
                </div>
                <p className="font-medium text-pretty">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-accent text-accent-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Besoin d'une intervention urgente ?</h2>
              <p className="text-lg mb-6 opacity-90">Pour les urgences, contactez-nous directement par téléphone</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span className="text-xl font-semibold">07 48 29 54 92</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Intervention dans tout l'Hérault</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
