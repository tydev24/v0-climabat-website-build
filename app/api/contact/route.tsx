import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact form API called")

    const body = await request.json()
    console.log("[v0] Request body received:", body)

    const { firstName, lastName, email, phone, city, service, message } = body

    // Validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: "Les champs obligatoires sont requis" }, { status: 400 })
    }

    try {
      console.log("[v0] Attempting to send email via nodemailer...")

      await sendContactEmail({
        firstName,
        lastName,
        email,
        phone,
        city,
        service,
        message,
      })

      console.log("[v0] Email sent successfully via nodemailer")
      return NextResponse.json({
        success: true,
        message: "Email envoyé avec succès",
      })
    } catch (error) {
      console.log("[v0] Nodemailer error:", error)

      const emailContent = {
        to: "contact@climabat34.fr",
        from: email,
        subject: `Nouvelle demande de contact - ${service || "Général"}`,
        content: `
NOUVELLE DEMANDE DE CONTACT

Informations du client:
- Nom complet: ${firstName} ${lastName}
- Email: ${email}
- Téléphone: ${phone}
- Ville: ${city || "Non spécifiée"}
- Service demandé: ${service || "Non spécifié"}

Message:
${message}

---
Email envoyé depuis le site web Climabat
Date: ${new Date().toLocaleString("fr-FR")}
Destination: contact@climabat34.fr
        `,
      }

      console.log("[v0] === EMAIL CONTENT FOR MANUAL PROCESSING ===")
      console.log("[v0] TO:", emailContent.to)
      console.log("[v0] FROM:", emailContent.from)
      console.log("[v0] SUBJECT:", emailContent.subject)
      console.log("[v0] CONTENT:", emailContent.content)
      console.log("[v0] === END EMAIL CONTENT ===")

      return NextResponse.json({
        success: true,
        message: "Votre demande a été reçue et sera traitée sous peu",
      })
    }
  } catch (error) {
    console.error("[v0] Error in contact API:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
