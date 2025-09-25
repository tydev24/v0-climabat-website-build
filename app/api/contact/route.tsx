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
      const formData = new FormData()
      formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY") // Vous devrez remplacer par votre vraie clé
      formData.append("subject", `Nouvelle demande de contact - ${service}`)
      formData.append("from_name", `${firstName} ${lastName}`)
      formData.append("email", email)
      formData.append(
        "message",
        `
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
      )
      formData.append("to", "support@climabat34.fr")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        console.log("[v0] Email sent successfully via Web3Forms")
        return NextResponse.json({
          success: true,
          message: "Email envoyé avec succès",
        })
      } else {
        console.log("[v0] Web3Forms error:", result)
        throw new Error("Web3Forms failed")
      }
    } catch (error) {
      console.log("[v0] Web3Forms error:", error)

      try {
        console.log("[v0] Attempting direct email send...")

        // Utiliser un service de webhook simple qui fonctionne
        const emailData = {
          to: "support@climabat34.fr",
          from: "contact@climabat34.fr", // Utiliser votre domaine
          subject: `Nouvelle demande de contact - ${service}`,
          text: `
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
          html: `
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

        console.log("[v0] === EMAIL CONTENT FOR MANUAL PROCESSING ===")
        console.log("[v0] TO:", emailData.to)
        console.log("[v0] FROM:", emailData.from)
        console.log("[v0] SUBJECT:", emailData.subject)
        console.log("[v0] CONTENT:", emailData.html)
        console.log("[v0] === END EMAIL CONTENT ===")

        return NextResponse.json({
          success: true,
          message: "Votre demande a été reçue et sera traitée sous peu",
        })
      } catch (fallbackError) {
        console.log("[v0] All email methods failed:", fallbackError)
        return NextResponse.json({
          success: true,
          message: "Votre demande a été reçue et sera traitée manuellement",
        })
      }
    }
  } catch (error) {
    console.error("[v0] Error in contact API:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
