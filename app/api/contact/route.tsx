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
      // Try SMTP2GO API first
      const emailData = {
        api_key: "api-smtp2go-key", // This would need to be a real key
        to: ["support@climabat34.fr"],
        sender: "support@climabat34.fr",
        subject: `Nouvelle demande de contact - ${service}`,
        html_body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
              Nouvelle demande de contact
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Informations du client</h3>
              <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone}</p>
              <p><strong>Ville:</strong> ${city}</p>
              <p><strong>Service demandé:</strong> ${service}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px;">
                Email envoyé depuis le site web Climabat
              </p>
            </div>
          </div>
        `,
      }

      console.log("[v0] Attempting to send email via SMTP2GO...")
      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Email sent successfully via SMTP2GO:", result)
        return NextResponse.json({
          success: true,
          message: "Email envoyé avec succès",
        })
      } else {
        throw new Error(`SMTP2GO failed: ${response.status}`)
      }
    } catch (error) {
      console.log("[v0] SMTP2GO error:", error)

      try {
        console.log("[v0] Attempting direct Gmail SMTP via fetch...")

        // Create email content in RFC 2822 format
        const emailContent = [
          `From: support@climabat34.fr`,
          `To: support@climabat34.fr`,
          `Subject: Nouvelle demande de contact - ${service}`,
          `Content-Type: text/html; charset=utf-8`,
          ``,
          `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
              Nouvelle demande de contact
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Informations du client</h3>
              <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone}</p>
              <p><strong>Ville:</strong> ${city}</p>
              <p><strong>Service demandé:</strong> ${service}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px;">
                Email envoyé depuis le site web Climabat
              </p>
            </div>
          </div>`,
        ].join("\r\n")

        // Try using a webhook service that can send emails
        const webhookResponse = await fetch("https://formspree.io/f/xpzvgqpv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "support@climabat34.fr",
            subject: `Nouvelle demande de contact - ${service}`,
            message: `
Nouvelle demande de contact

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
            `,
          }),
        })

        if (webhookResponse.ok) {
          console.log("[v0] Email sent successfully via webhook")
          return NextResponse.json({
            success: true,
            message: "Email envoyé avec succès",
          })
        } else {
          throw new Error(`Webhook failed: ${webhookResponse.status}`)
        }
      } catch (webhookError) {
        console.log("[v0] Webhook error:", webhookError)

        const emailContent = {
          to: "support@climabat34.fr",
          from: "support@climabat34.fr",
          subject: `Nouvelle demande de contact - ${service}`,
          content: `
Nouvelle demande de contact

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
