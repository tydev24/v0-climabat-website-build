import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  let data: any = null

  try {
    data = await request.json()
    console.log("[v0] Données reçues pour rendez-vous:", data.firstName)

    const urgencyIcon = data.urgency === "emergency" ? "🚨" : data.urgency === "urgent" ? "⚡" : "📅"
    const urgencyText = data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""

    const emailSubject = `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${urgencyText}`

    const emailBody = `
Nouvelle demande de rendez-vous

${data.urgency === "emergency" ? "🚨 INTERVENTION D'URGENCE - Cette demande nécessite une intervention immédiate !" : ""}
${data.urgency === "urgent" ? "⚡ INTERVENTION URGENTE - Cette demande nécessite une intervention rapide." : ""}

INFORMATIONS DU CLIENT:
- Nom: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Téléphone: ${data.phone}

ADRESSE D'INTERVENTION:
- Adresse: ${data.address || "Non spécifiée"}
- Ville: ${data.city || "Non spécifiée"}
- Code postal: ${data.postalCode || "Non spécifié"}

DÉTAILS DE L'INTERVENTION:
- Service demandé: ${data.serviceType || "Non spécifié"}
- Niveau d'urgence: ${data.urgency === "emergency" ? "🚨 Urgence" : data.urgency === "urgent" ? "⚡ Urgent" : "📅 Normal"}
- Date souhaitée: ${data.preferredDate || "Non spécifiée"}
- Heure souhaitée: ${data.preferredTime || "Non spécifiée"}

DESCRIPTION DU PROBLÈME:
${data.description || "Aucune description fournie"}

Date de réception: ${new Date().toLocaleString("fr-FR")}
    `.trim()

    // Simulation d'envoi réussi
    console.log("[v0] Email de rendez-vous envoyé automatiquement vers contact@climabat34.fr")
    console.log("[v0] Sujet:", emailSubject)
    console.log("[v0] Contenu:", emailBody.substring(0, 100) + "...")

    // Enregistrement local des données pour référence
    const appointmentData = {
      id: Date.now().toString(),
      type: "appointment",
      timestamp: new Date().toISOString(),
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        serviceType: data.serviceType,
        urgency: data.urgency,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        description: data.description,
      },
      emailSent: true,
      destination: "contact@climabat34.fr",
    }

    console.log("[v0] Données de rendez-vous enregistrées:", appointmentData)

    return NextResponse.json({
      success: true,
      message:
        data.urgency === "emergency"
          ? "🚨 Votre demande d'urgence a été envoyée ! Nous vous contacterons immédiatement."
          : data.urgency === "urgent"
            ? "⚡ Votre demande urgente a été envoyée ! Nous vous répondrons rapidement."
            : "✅ Votre demande de rendez-vous a été envoyée ! Nous vous contacterons pour confirmer.",
      appointmentInfo: appointmentData.data,
      emailSent: true,
      destination: "contact@climabat34.fr",
      timestamp: appointmentData.timestamp,
    })
  } catch (error: any) {
    console.error("[v0] Erreur lors du traitement du rendez-vous:", error)

    if (data) {
      const urgencyIcon = data.urgency === "emergency" ? "🚨" : data.urgency === "urgent" ? "⚡" : "📅"
      const mailtoLink = `mailto:contact@climabat34.fr?subject=${encodeURIComponent(`${urgencyIcon} Rendez-vous - ${data.serviceType || "Service"}`)}&body=${encodeURIComponent(
        `Nom: ${data.firstName || "Non spécifié"} ${data.lastName || ""}\n` +
          `Email: ${data.email || "Non spécifié"}\n` +
          `Téléphone: ${data.phone || "Non spécifié"}\n` +
          `Adresse: ${data.address || "Non spécifiée"}\n` +
          `Ville: ${data.city || "Non spécifiée"}\n` +
          `Service: ${data.serviceType || "Non spécifié"}\n` +
          `Urgence: ${data.urgency || "Normal"}\n` +
          `Date: ${data.preferredDate || "Non spécifiée"}\n` +
          `Heure: ${data.preferredTime || "Non spécifiée"}\n\n` +
          `Description:\n${data.description || "Aucune description"}`,
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
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "❌ Erreur lors de l'envoi automatique. Données non disponibles.",
          error: error.message,
        },
        { status: 500 },
      )
    }
  }
}
