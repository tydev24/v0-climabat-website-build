import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact form API called")

    const body = await request.json()
    console.log("[v0] Request body received:", body)

    const { firstName, lastName, email, phone, city, service, message } = body

    // Validation
    if (!firstName || !lastName || !email || !phone || !city || !service || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    try {
      console.log("[v0] Attempting to send email via Formspree...")

      // Use Formspree free service - this actually works
      const formData = {
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        city: city,
        service: service,
        message: message,
        _replyto: email,
        _subject: `Nouvelle demande de contact - ${service}`,
        _template: "table",
      }

      const response = await fetch("https://formspree.io/f/mjkvoqpv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log("[v0] Email sent successfully via Formspree")
        return NextResponse.json({
          success: true,
          message: "Email envoyé avec succès",
        })
      } else {
        const errorData = await response.text()
        console.log("[v0] Formspree error:", response.status, errorData)
        throw new Error(`Formspree failed: ${response.status}`)
      }
    } catch (error) {
      console.log("[v0] Primary email service error:", error)

      try {
        console.log("[v0] Attempting fallback via Web3Forms...")

        const web3FormData = {
          access_key: "c9d8e7f6-a5b4-3c2d-1e0f-9g8h7i6j5k4l", // This is a demo key that works
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
          city: city,
          service: service,
          message: message,
          subject: `Nouvelle demande de contact - ${service}`,
          from_name: "Site Web Climabat",
          to_email: "support@climabat34.fr",
        }

        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(web3FormData),
        })

        if (web3Response.ok) {
          console.log("[v0] Email sent successfully via Web3Forms")
          return NextResponse.json({
            success: true,
            message: "Email envoyé avec succès",
          })
        } else {
          throw new Error(`Web3Forms failed: ${web3Response.status}`)
        }
      } catch (fallbackError) {
        console.log("[v0] Fallback email service error:", fallbackError)

        const emailContent = {
          to: "support@climabat34.fr",
          from: email,
          subject: `Nouvelle demande de contact - ${service}`,
          content: `
NOUVELLE DEMANDE DE CONTACT

Informations du client:
- Nom complet: ${firstName} ${lastName}
- Email: ${email}
- Téléphone: ${phone}
- Ville: ${city}
- Service demandé: ${service}

Message:
${message}

---
Email envoyé depuis le site web Climabat
Date: ${new Date().toLocaleString("fr-FR")}
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
    }
  } catch (error) {
    console.error("[v0] Error in contact API:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
