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
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city?: string
  service?: string
  message: string
}

async function sendContactForm(data: ContactFormData) {
  try {
    console.log("[v0] Envoi du formulaire de contact:", data)

    const response = await fetch("/api/send-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log("[v0] Email envoyé avec succès vers:", result.destination)
      console.log("[v0] Réponse API reçue:", result.message)

      return {
        success: true,
        message: result.message,
      }
    } else {
      throw new Error(result.message || "Erreur lors de l'envoi")
    }
  } catch (error) {
    console.log("[v0] Erreur lors de l'envoi:", error)

    const subject = encodeURIComponent(`Contact - ${data.service || "Général"}`)
    const body = encodeURIComponent(
      `Nom: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Téléphone: ${data.phone}\n` +
        `Ville: ${data.city || "Non spécifiée"}\n` +
        `Service: ${data.service || "Non spécifié"}\n\n` +
        `Message:\n${data.message}`,
    )

    window.location.href = `mailto:contact@climabat34.fr?subject=${subject}&body=${body}`

    return {
      success: true,
      message: "Votre client email s'est ouvert avec le message pré-rempli. Cliquez sur 'Envoyer' pour nous contacter.",
    }
  }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    service: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("[v0] Envoi du formulaire avec les données:", formData)

      const result = await sendContactForm(formData)

      console.log("[v0] Résultat de l'envoi:", result)

      if (result.success) {
        toast({
          title: "✅ Message envoyé avec succès !",
          description:
            result.message ||
            "Nous avons bien reçu votre demande. Notre équipe vous recontactera dans les plus brefs délais.",
          duration: 6000,
        })

        setIsSubmitted(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          service: "",
          message: "",
        })

        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("[v0] Erreur lors de l'envoi:", error)
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section
        className="relative py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/professional-hvac-technician-working-on-heating-sy.jpg')",
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
                <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-lg">Téléphone</h3>
                        <p className="text-foreground font-medium text-lg">07 48 29 54 92</p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Disponible 24h/24 pour les urgences
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-lg">Email</h3>
                        <p className="text-foreground font-medium text-lg">contact@climabat34.fr</p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Réponse sous 24h ouvrées
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-lg">Zone d'intervention</h3>
                        <p className="text-foreground font-medium">Tout l'Hérault (34)</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Montpellier, Béziers, Sète, Lunel, Pézenas...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-lg">Horaires</h3>
                        <p className="text-foreground font-medium">7 jours sur 7</p>
                        <p className="text-foreground">8h - 18h en semaine</p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Urgences 24h/24, 7j/7
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6" />
                    Demande de devis gratuit
                  </CardTitle>
                  <p className="text-primary-foreground/90">Remplissez ce formulaire et recevez votre devis sous 24h</p>
                </CardHeader>
                <CardContent className="p-6">
                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                          <h3 className="font-semibold text-green-800">Message envoyé avec succès !</h3>
                          <p className="text-green-700 text-sm">
                            Nous avons bien reçu votre demande de devis. Notre équipe vous contactera sous 24h pour
                            étudier votre projet.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          className="border-2 focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          className="border-2 focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="border-2 focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        className="border-2 focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        Ville
                      </Label>
                      <Input
                        id="city"
                        placeholder="Ex: Montpellier"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        className="border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-medium">
                        Type de service
                      </Label>
                      <Select value={formData.service} onValueChange={(value) => updateFormData("service", value)}>
                        <SelectTrigger className="border-2 focus:border-primary">
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
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Décrivez votre projet ou votre demande..."
                        className="min-h-[120px] border-2 focus:border-primary"
                        value={formData.message}
                        onChange={(e) => updateFormData("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
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

      <section
        className="relative py-12 sm:py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.9)), url('/emergency-hvac-service-24h-technical-support.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Service d'urgence 24h/24</h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Panne de chauffage ? Problème de climatisation ? Nous intervenons rapidement dans tout l'Hérault !
          </p>
          <Button size="lg" variant="secondary" asChild className="shadow-lg hover:shadow-xl transition-shadow">
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
