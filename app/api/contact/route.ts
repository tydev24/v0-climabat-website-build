import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact form API called")

    const body = await request.json()
    console.log("[v0] Request body received:", JSON.stringify(body, null, 2))

    const { firstName, lastName, email, phone, city, service, message } = body

    if (!firstName || !lastName || !email || !message) {
      console.log("[v0] Missing required fields:", {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        message: !!message,
      })
      return NextResponse.json({ success: false, message: "Champs requis manquants" }, { status: 400 })
    }

    console.log("[v0] Creating SMTP transporter for contact form")
    const transporter = nodemailer.createTransport({
      host: "mail.climabat34.fr",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "support@climabat34.fr",
        pass: "vM8$GKHN2Xy2Sjd",
      },
    })

    console.log("[v0] Preparing email options")
    const mailOptions = {
      from: "support@climabat34.fr",
      to: "contact@climabat34.fr",
      subject: "Nouvelle demande de devis",
      text: `
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
      `.trim(),
    }

    console.log("[v0] Mail options prepared:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      textLength: mailOptions.text.length,
    })

    console.log("[v0] Attempting to send email...")
    const result = await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully:", result.messageId)

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    })
  } catch (error) {
    console.error("[v0] Error sending contact email:", error)
    console.error("[v0] Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
    })
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
