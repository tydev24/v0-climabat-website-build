import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: "mail.climabat34.fr",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "support@climabat34.fr",
    pass: "Climabat34@",
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, city, service, message } = body

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

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
