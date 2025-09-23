"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section
        className="relative py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/modern-office-building-with-hvac-equipment.jpg')",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Contactez-nous</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-balance max-w-3xl mx-auto">
            Une question ? Un projet ? Notre équipe est à votre disposition
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">Nos Coordonnées</h2>
                <p className="text-muted-foreground mb-8">
                  N'hésitez pas à nous contacter par téléphone, email ou via le formulaire ci-contre. Nous vous
                  répondrons rapidement.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Téléphone</h3>
                        <p className="text-muted-foreground">07 48 29 54 92</p>
                        <p className="text-sm text-muted-foreground mt-1">Disponible 24h/24 pour les urgences</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">contact@climabat34.fr</p>
                        <p className="text-sm text-muted-foreground mt-1">Réponse sous 24h ouvrées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Zone d'intervention</h3>
                        <p className="text-muted-foreground">Tout l'Hérault (34)</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Montpellier, Béziers, Sète, Lunel, Pézenas...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Horaires</h3>
                        <p className="text-muted-foreground">7 jours sur 7</p>
                        <p className="text-muted-foreground">8h - 18h en semaine</p>
                        <p className="text-sm text-muted-foreground mt-1">Urgences 24h/24, 7j/7</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Demande de devis gratuit</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" type="tel" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" placeholder="Ex: Montpellier" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Type de service</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chauffage">Chauffage</SelectItem>
                          <SelectItem value="climatisation">Climatisation</SelectItem>
                          <SelectItem value="ventilation">Ventilation</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="depannage">Dépannage</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Décrivez votre projet ou votre demande..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer ma demande
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Service d'urgence 24h/24</h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Panne de chauffage ? Problème de climatisation ? Nous intervenons rapidement dans tout l'Hérault !
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="tel:0748295492">
              <Phone className="h-5 w-5 mr-2" />
              Appeler maintenant : 07 48 29 54 92
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
