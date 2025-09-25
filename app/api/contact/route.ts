import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, city, service, message } = body

    const emailContent = `
Nouvelle demande de devis depuis le site web

Informations client :
- Nom : ${firstName} ${lastName}
- Email : ${email}
- Téléphone : ${phone}
- Ville : ${city || "Non spécifiée"}
- Service demandé : ${service || "Non spécifié"}

Message :
${message}

---
Email envoyé automatiquement depuis le formulaire de contact du site Climabat.34
    `.trim()

    console.log("Email à envoyer à contact@climabat34.fr:")
    console.log("Sujet: Nouvelle demande de devis")
    console.log("Contenu:", emailContent)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
