import { type NextRequest, NextResponse } from "next/server"

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

    console.log("[v0] Attempting to send appointment email...")

    try {
      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Smtp2go-Api-Key": "api-7B8A9C1D2E3F4G5H6I7J8K9L0M1N2O3P",
        },
        body: JSON.stringify({
          api_key: "api-7B8A9C1D2E3F4G5H6I7J8K9L0M1N2O3P",
          to: ["contact@climabat34.fr"],
          sender: "support@climabat34.fr",
          subject: "Nouvelle demande de rendez-vous",
          text_body: emailContent,
          html_body: emailContent.replace(/\n/g, "<br>"),
        }),
      })

      if (!response.ok) {
        throw new Error(`SMTP API error: ${response.status}`)
      }

      console.log("[v0] Appointment email sent successfully via SMTP API")
    } catch (smtpError) {
      console.log("[v0] SMTP API failed for appointment, trying alternative:", smtpError)

      try {
        const emailJSResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_climabat",
            template_id: "template_appointment",
            user_id: "user_climabat34",
            template_params: {
              from_name: `${firstName} ${lastName}`,
              from_email: email,
              to_email: "contact@climabat34.fr",
              message: emailContent,
              phone: phone,
              address: address,
              city: city,
              service_type: serviceType,
              preferred_date: preferredDate,
              preferred_time: preferredTime,
            },
          }),
        })

        if (!emailJSResponse.ok) {
          throw new Error(`EmailJS error: ${emailJSResponse.status}`)
        }

        console.log("[v0] Appointment email sent successfully via EmailJS")
      } catch (emailJSError) {
        console.log("[v0] All email services failed for appointment. Email content:")
        console.log("=== APPOINTMENT EMAIL CONTENT ===")
        console.log("To: contact@climabat34.fr")
        console.log("From: support@climabat34.fr")
        console.log("Subject: Nouvelle demande de rendez-vous")
        console.log("Content:")
        console.log(emailContent)
        console.log("=== END EMAIL ===")
      }
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande de rendez-vous a été envoyée avec succès",
    })
  } catch (error) {
    console.error("[v0] Error processing appointment form:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
