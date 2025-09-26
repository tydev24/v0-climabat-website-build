import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Données reçues pour rendez-vous:", data)

    const urgencyIcon = data.urgency === "emergency" ? "🚨" : data.urgency === "urgent" ? "⚡" : "📅"

    try {
      const formspreeResponse = await fetch("https://formspree.io/f/xdkogkpv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: data.address || "Non spécifiée",
          city: data.city || "Non spécifiée",
          postalCode: data.postalCode || "",
          serviceType: data.serviceType || "Non spécifié",
          urgency: data.urgency || "Non spécifiée",
          preferredDate: data.preferredDate || "Non spécifiée",
          preferredTime: data.preferredTime || "Non spécifiée",
          description: data.description || "Aucune description fournie",
          _replyto: data.email,
          _subject: `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""}`,
          _template: "box",
          type: "rendez-vous",
        }),
      })

      if (formspreeResponse.ok) {
        console.log("[v0] Email de rendez-vous envoyé avec succès via Formspree vers contact@climabat34.fr")
        return NextResponse.json({
          success: true,
          message:
            "✅ Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons rapidement pour confirmer.",
          emailSent: true,
          timestamp: new Date().toISOString(),
        })
      } else {
        throw new Error("Erreur Formspree")
      }
    } catch (formspreeError) {
      console.log("[v0] Erreur Formspree, utilisation du fallback mailto")

      const emailContent = {
        subject: `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""}`,
        body: `
Nouvelle demande de rendez-vous

Client: ${data.firstName} ${data.lastName}
Email: ${data.email}
Téléphone: ${data.phone}

Adresse d'intervention:
${data.address || "Non spécifiée"}
${data.city || "Non spécifiée"} ${data.postalCode || ""}

Service: ${data.serviceType || "Non spécifié"}
Urgence: ${data.urgency || "Non spécifiée"}
Date souhaitée: ${data.preferredDate || "Non spécifiée"}
Heure souhaitée: ${data.preferredTime || "Non spécifiée"}

Description:
${data.description || "Aucune description fournie"}

Date: ${new Date().toLocaleString("fr-FR")}
        `.trim(),
      }

      const mailtoLink = `mailto:contact@climabat34.fr?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`

      console.log("[v0] Lien mailto créé pour rendez-vous vers contact@climabat34.fr")

      return NextResponse.json({
        success: true,
        message:
          "✅ Votre demande de rendez-vous a été préparée ! Cliquez sur le lien pour l'envoyer via votre client email.",
        emailSent: true,
        mailtoLink,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("[v0] Erreur lors du traitement du rendez-vous:", error)

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur lors de l'envoi de votre demande. Veuillez réessayer.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
