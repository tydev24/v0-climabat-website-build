import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Appointment form API called")

    const body = await request.json()
    console.log("[v0] Request body received:", JSON.stringify(body, null, 2))

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

    if (!firstName || !lastName || !email || !phone || !address || !city || !serviceType) {
      console.log("[v0] Missing required fields:", {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        phone: !!phone,
        address: !!address,
        city: !!city,
        serviceType: !!serviceType,
      })
      return NextResponse.json({ success: false, message: "Champs requis manquants" }, { status: 400 })
    }

    console.log("[v0] Preparing appointment email content")

    const emailContent = `
      <h2>Nouvelle demande de rendez-vous depuis le site web</h2>
      
      <h3>Informations client :</h3>
      <ul>
        <li><strong>Nom :</strong> ${firstName} ${lastName}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Téléphone :</strong> ${phone}</li>
      </ul>

      <h3>Adresse d'intervention :</h3>
      <ul>
        <li><strong>Adresse :</strong> ${address}</li>
        <li><strong>Ville :</strong> ${city}</li>
        <li><strong>Code postal :</strong> ${postalCode}</li>
      </ul>

      <h3>Détails de l'intervention :</h3>
      <ul>
        <li><strong>Service demandé :</strong> ${serviceType}</li>
        <li><strong>Urgence :</strong> ${urgency || "Non spécifiée"}</li>
        <li><strong>Date souhaitée :</strong> ${preferredDate || "Non spécifiée"}</li>
        <li><strong>Créneau horaire :</strong> ${preferredTime || "Non spécifié"}</li>
      </ul>

      <h3>Description :</h3>
      <p>${description || "Aucune description fournie"}</p>

      <hr>
      <p><em>Email envoyé automatiquement depuis le formulaire de rendez-vous du site Climabat.34</em></p>
    `

    console.log("[v0] Attempting to send appointment email via Resend...")

    const { data, error } = await resend.emails.send({
      from: "Climabat Rendez-vous <onboarding@resend.dev>", // Using Resend's default sender for testing
      to: ["contact@climabat34.fr"],
      subject: "Nouvelle demande de rendez-vous",
      html: emailContent,
      replyTo: email, // Allow replying directly to the customer
    })

    if (error) {
      console.error("[v0] Error sending appointment email:", error)
      return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
    }

    console.log("[v0] Appointment email sent successfully via Resend:", data)

    return NextResponse.json({
      success: true,
      message: "Votre demande de rendez-vous a été envoyée avec succès",
    })
  } catch (error) {
    console.error("[v0] Error processing appointment form:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
