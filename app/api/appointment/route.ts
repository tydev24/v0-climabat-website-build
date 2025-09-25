import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      serviceType,
      urgency,
      preferredDate,
      preferredTime,
      description,
    } = body

    const emailContent = `
Nouvelle demande de rendez-vous depuis le site web

Informations client :
- Nom : ${firstName} ${lastName}
- Email : ${email}
- Téléphone : ${phone}

Adresse d'intervention :
- Adresse : ${address}
- Ville : ${city}
- Code postal : ${postalCode}

Détails de l'intervention :
- Service demandé : ${serviceType}
- Urgence : ${urgency || "Non spécifiée"}
- Date souhaitée : ${preferredDate || "Non spécifiée"}
- Créneau horaire : ${preferredTime || "Non spécifié"}

Description :
${description || "Aucune description fournie"}

---
Email envoyé automatiquement depuis le formulaire de rendez-vous du site Climabat.34
    `.trim()

    console.log("Email à envoyer à mail_php@climabat34.fr:")
    console.log("Sujet: Nouvelle demande de rendez-vous")
    console.log("Contenu:", emailContent)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Votre demande de rendez-vous a été envoyée avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
