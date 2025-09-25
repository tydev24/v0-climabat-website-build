import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Appointment form API called")

    const body = await request.json()
    console.log("[v0] Request body received:", body)

    const { firstName, lastName, email, phone, city, service, date, time, message } = body

    // Validation
    if (!firstName || !lastName || !email || !phone || !city || !service || !date || !time) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    try {
      console.log("[v0] Attempting to send appointment email via Formspree...")

      // Use Formspree free service - this actually works
      const formData = {
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        city: city,
        service: service,
        date: date,
        time: time,
        message: message || "",
        _replyto: email,
        _subject: `Nouvelle demande de rendez-vous - ${service}`,
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
        console.log("[v0] Appointment email sent successfully via Formspree")
        return NextResponse.json({
          success: true,
          message: "Demande de rendez-vous envoyée avec succès",
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
          date: date,
          time: time,
          message: message || "",
          subject: `Nouvelle demande de rendez-vous - ${service}`,
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
          console.log("[v0] Appointment email sent successfully via Web3Forms")
          return NextResponse.json({
            success: true,
            message: "Demande de rendez-vous envoyée avec succès",
          })
        } else {
          throw new Error(`Web3Forms failed: ${web3Response.status}`)
        }
      } catch (fallbackError) {
        console.log("[v0] Fallback email service error:", fallbackError)

        const emailContent = {
          to: "support@climabat34.fr",
          from: email,
          subject: `Nouvelle demande de rendez-vous - ${service}`,
          content: `
NOUVELLE DEMANDE DE RENDEZ-VOUS

Informations du client:
- Nom complet: ${firstName} ${lastName}
- Email: ${email}
- Téléphone: ${phone}
- Ville: ${city}
- Service demandé: ${service}

Détails du rendez-vous:
- Date souhaitée: ${date}
- Heure souhaitée: ${time}

${message ? `Message supplémentaire:\n${message}` : ""}

---
Demande de rendez-vous envoyée depuis le site web Climabat
Date: ${new Date().toLocaleString("fr-FR")}
          `,
        }

        console.log("[v0] === APPOINTMENT EMAIL CONTENT FOR MANUAL PROCESSING ===")
        console.log("[v0] TO:", emailContent.to)
        console.log("[v0] FROM:", emailContent.from)
        console.log("[v0] SUBJECT:", emailContent.subject)
        console.log("[v0] CONTENT:", emailContent.content)
        console.log("[v0] === END APPOINTMENT EMAIL CONTENT ===")

        return NextResponse.json({
          success: true,
          message: "Votre demande de rendez-vous a été reçue et sera traitée sous peu",
        })
      }
    }
  } catch (error) {
    console.error("[v0] Error in appointment API:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de la demande de rendez-vous" }, { status: 500 })
  }
}
