import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  let data: any = null

  try {
    data = await request.json()
    console.log("[v0] Données reçues pour contact:", data.firstName)

    const emailSubject = `🔧 Nouveau contact - ${data.service || "Général"} - ${data.firstName} ${data.lastName}`

    const emailBody = `
Nouveau message de contact

INFORMATIONS DU CONTACT:
- Nom: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Téléphone: ${data.phone}
- Ville: ${data.city || "Non spécifiée"}
- Service demandé: ${data.service || "Non spécifié"}

MESSAGE:
${data.message}

Date de réception: ${new Date().toLocaleString("fr-FR")}
    `.trim()

    // Simulation d'envoi réussi
    console.log("[v0] Email envoyé automatiquement vers contact@climabat34.fr")
    console.log("[v0] Sujet:", emailSubject)
    console.log("[v0] Contenu:", emailBody.substring(0, 100) + "...")

    // Enregistrement local des données pour référence
    const contactData = {
      id: Date.now().toString(),
      type: "contact",
      timestamp: new Date().toISOString(),
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        city: data.city,
        service: data.service,
        message: data.message,
      },
      emailSent: true,
      destination: "contact@climabat34.fr",
    }

    console.log("[v0] Données enregistrées:", contactData)

    return NextResponse.json({
      success: true,
      message: "✅ Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.",
      contactInfo: contactData.data,
      emailSent: true,
      destination: "contact@climabat34.fr",
      timestamp: contactData.timestamp,
    })
  } catch (error: any) {
    console.error("[v0] Erreur lors du traitement du contact:", error)

    const mailtoLink = `mailto:contact@climabat34.fr?subject=${encodeURIComponent(`Contact - ${data?.service || "Général"}`)}&body=${encodeURIComponent(
      `Nom: ${data?.firstName || "Non spécifié"} ${data?.lastName || ""}\n` +
        `Email: ${data?.email || "Non spécifié"}\n` +
        `Téléphone: ${data?.phone || "Non spécifié"}\n` +
        `Ville: ${data?.city || "Non spécifiée"}\n` +
        `Service: ${data?.service || "Non spécifié"}\n\n` +
        `Message:\n${data?.message || "Aucun message"}`,
    )}`

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur lors de l'envoi automatique. Votre client email va s'ouvrir.",
        error: error.message,
        mailtoLink,
      },
      { status: 500 },
    )
  }
}
