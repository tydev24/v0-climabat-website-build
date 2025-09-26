import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Données reçues pour contact:", data)

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
          city: data.city || "Non spécifiée",
          service: data.service || "Non spécifié",
          message: data.message,
          _replyto: data.email,
          _subject: `🔧 Nouveau contact - ${data.service || "Général"} - ${data.firstName} ${data.lastName}`,
          _template: "box",
        }),
      })

      if (formspreeResponse.ok) {
        console.log("[v0] Email envoyé avec succès via Formspree vers contact@climabat34.fr")
        return NextResponse.json({
          success: true,
          message: "✅ Votre message a été envoyé avec succès ! Nous vous recontacterons dans les plus brefs délais.",
          emailSent: true,
          timestamp: new Date().toISOString(),
        })
      } else {
        throw new Error("Erreur Formspree")
      }
    } catch (formspreeError) {
      console.log("[v0] Erreur Formspree, utilisation du fallback mailto")

      const emailContent = {
        subject: `🔧 Nouveau contact - ${data.service || "Général"} - ${data.firstName} ${data.lastName}`,
        body: `
Nouveau message de contact

Nom: ${data.firstName} ${data.lastName}
Email: ${data.email}
Téléphone: ${data.phone}
Ville: ${data.city || "Non spécifiée"}
Service: ${data.service || "Non spécifié"}

Message:
${data.message}

Date: ${new Date().toLocaleString("fr-FR")}
        `.trim(),
      }

      const mailtoLink = `mailto:contact@climabat34.fr?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`

      console.log("[v0] Lien mailto créé pour contact@climabat34.fr")

      return NextResponse.json({
        success: true,
        message: "✅ Votre message a été préparé ! Cliquez sur le lien pour l'envoyer via votre client email.",
        emailSent: true,
        mailtoLink,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("[v0] Erreur lors du traitement du contact:", error)

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur lors de l'envoi de votre message. Veuillez réessayer.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
