"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, User, MapPin, Wrench, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
// import { sendAppointmentForm } from "@/lib/form-service"

export function AppointmentForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    serviceType: "",
    urgency: "",
    preferredDate: "",
    preferredTime: "",
    description: "",
    acceptTerms: false,
  })

  const serviceTypes = [
    { value: "chauffage", label: "Chauffage" },
    { value: "climatisation", label: "Climatisation" },
    { value: "ventilation", label: "Ventilation" },
    { value: "maintenance", label: "Maintenance" },
    { value: "depannage", label: "Dépannage" },
    { value: "devis", label: "Devis / Conseil" },
  ]

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: "✅ Rendez-vous demandé avec succès !",
          description: result.message,
          duration: 6000,
        })

        setIsSubmitted(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          postalCode: "",
          serviceType: "",
          urgency: "",
          preferredDate: "",
          preferredTime: "",
          description: "",
          acceptTerms: false,
        })

        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        throw new Error(result.message || "Erreur lors de l'envoi")
      }
    } catch (error) {
      console.error("[v0] Erreur lors de l'envoi:", error)

      const subject = encodeURIComponent(`Demande de rendez-vous - ${formData.serviceType || "Service général"}`)
      const body = encodeURIComponent(
        `Nom: ${formData.firstName} ${formData.lastName}\n` +
          `Email: ${formData.email}\n` +
          `Téléphone: ${formData.phone}\n` +
          `Adresse: ${formData.address || "Non spécifiée"}\n` +
          `Ville: ${formData.city || "Non spécifiée"}\n` +
          `Code postal: ${formData.postalCode || "Non spécifié"}\n` +
          `Type de service: ${formData.serviceType || "Non spécifié"}\n` +
          `Urgence: ${formData.urgency || "Non spécifiée"}\n` +
          `Date préférée: ${formData.preferredDate || "Non spécifiée"}\n` +
          `Heure préférée: ${formData.preferredTime || "Non spécifiée"}\n\n` +
          `Description:\n${formData.description || "Aucune description fournie"}`,
      )

      window.location.href = `mailto:contact@climabat34.fr?subject=${subject}&body=${body}`

      toast({
        title: "✅ Client email ouvert",
        description:
          "Votre client email s'est ouvert avec la demande pré-remplie. Cliquez sur 'Envoyer' pour nous contacter.",
        duration: 6000,
      })
    }

    setIsSubmitting(false)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Prendre rendez-vous
        </CardTitle>
        <p className="text-muted-foreground">Remplissez ce formulaire et nous vous contacterons rapidement</p>
      </CardHeader>
      <CardContent>
        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Demande envoyée avec succès !</h3>
                <p className="text-green-700 text-sm">
                  Nous avons bien reçu votre demande de rendez-vous. Notre équipe vous contactera très prochainement
                  pour confirmer votre intervention.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informations personnelles
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Adresse d'intervention
            </h3>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData("postalCode", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Type d'intervention
            </h3>
            <div className="space-y-2">
              <Label>Service demandé *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => updateFormData("serviceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Urgence</Label>
              <RadioGroup
                value={formData.urgency}
                onValueChange={(value) => updateFormData("urgency", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal (sous 48h)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">Urgent (sous 24h)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label htmlFor="emergency">Urgence (intervention immédiate)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Planification
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Date souhaitée</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  min={minDate}
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData("preferredDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Créneau horaire</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) => updateFormData("preferredTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un créneau" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description du problème ou demande</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre demande, le problème rencontré, ou toute information utile..."
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              rows={4}
            />
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
              required
            />
            <Label htmlFor="terms" className="text-sm">
              J'accepte d'être contacté par Climabat.34 concernant ma demande *
            </Label>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Demander un rendez-vous"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
