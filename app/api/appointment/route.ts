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

    const mailOptions = {
      from: "support@climabat34.fr",
      to: "contact@climabat34.fr",
      subject: "Nouvelle demande de rendez-vous",
      text: `
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
      `.trim(),
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Votre demande de rendez-vous a été envoyée avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
