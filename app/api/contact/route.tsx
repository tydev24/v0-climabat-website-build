import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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

    console.log("[v0] Preparing email content")

    const emailContent = `
      <h2>Nouvelle demande de devis depuis le site web</h2>
      
      <h3>Informations client :</h3>
      <ul>
        <li><strong>Nom :</strong> ${firstName} ${lastName}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Téléphone :</strong> ${phone}</li>
        <li><strong>Ville :</strong> ${city || "Non spécifiée"}</li>
        <li><strong>Service demandé :</strong> ${service || "Non spécifié"}</li>
      </ul>

      <h3>Message :</h3>
      <p>${message}</p>

      <hr>
      <p><em>Email envoyé automatiquement depuis le formulaire de contact du site Climabat.34</em></p>
    `

    console.log("[v0] Attempting to send email via Resend...")

    const { data, error } = await resend.emails.send({
      from: "Climabat Contact <onboarding@resend.dev>", // Using Resend's default sender for testing
      to: ["contact@climabat34.fr"],
      subject: "Nouvelle demande de devis",
      html: emailContent,
      replyTo: email, // Allow replying directly to the customer
    })

    if (error) {
      console.error("[v0] Error sending contact email:", error)
      return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully via Resend:", data)

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
