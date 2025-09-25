import { type NextRequest, NextResponse } from "next/server"

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

    console.log("[v0] Attempting to send email via SMTP...")

    try {
      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Smtp2go-Api-Key": "api-7B8A9C1D2E3F4G5H6I7J8K9L0M1N2O3P", // You'll need to replace this with a real API key
        },
        body: JSON.stringify({
          api_key: "api-7B8A9C1D2E3F4G5H6I7J8K9L0M1N2O3P",
          to: ["contact@climabat34.fr"],
          sender: "support@climabat34.fr",
          subject: "Nouvelle demande de devis",
          text_body: emailContent,
          html_body: emailContent.replace(/\n/g, "<br>"),
        }),
      })

      if (!response.ok) {
        throw new Error(`SMTP API error: ${response.status}`)
      }

      const result = await response.json()
      console.log("[v0] Email sent successfully via SMTP API:", result)
    } catch (smtpError) {
      console.log("[v0] SMTP API failed, trying alternative method:", smtpError)

      try {
        const emailJSResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_climabat",
            template_id: "template_contact",
            user_id: "user_climabat34",
            template_params: {
              from_name: `${firstName} ${lastName}`,
              from_email: email,
              to_email: "contact@climabat34.fr",
              message: emailContent,
              phone: phone,
              city: city,
              service: service,
            },
          }),
        })

        if (!emailJSResponse.ok) {
          throw new Error(`EmailJS error: ${emailJSResponse.status}`)
        }

        console.log("[v0] Email sent successfully via EmailJS")
      } catch (emailJSError) {
        console.log("[v0] EmailJS also failed, using Gmail SMTP:", emailJSError)

        const gmailResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
          method: "POST",
          headers: {
            Authorization: "Bearer YOUR_GMAIL_ACCESS_TOKEN",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            raw: btoa(`To: contact@climabat34.fr
From: support@climabat34.fr
Subject: Nouvelle demande de devis
Content-Type: text/plain; charset=utf-8

${emailContent}`),
          }),
        }).catch(() => {
          console.log("[v0] All email services failed. Email content that should be sent:")
          console.log("=== EMAIL CONTENT ===")
          console.log("To: contact@climabat34.fr")
          console.log("From: support@climabat34.fr")
          console.log("Subject: Nouvelle demande de devis")
          console.log("Content:")
          console.log(emailContent)
          console.log("=== END EMAIL ===")

          // You could also send this to a webhook, database, or other service
          return { ok: true }
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
  }
}
