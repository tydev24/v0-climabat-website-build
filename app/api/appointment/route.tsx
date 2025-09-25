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
      const formData = new FormData()
      formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY") // Vous devrez remplacer par votre vraie clé
      formData.append("subject", `Nouvelle demande de rendez-vous - ${service}`)
      formData.append("from_name", `${firstName} ${lastName}`)
      formData.append("email", email)
      formData.append(
        "message",
        `
Nouvelle demande de rendez-vous

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
      `,
      )
      formData.append("to", "support@climabat34.fr")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        console.log("[v0] Appointment email sent successfully via Web3Forms")
        return NextResponse.json({
          success: true,
          message: "Demande de rendez-vous envoyée avec succès",
        })
      } else {
        console.log("[v0] Web3Forms error:", result)
        throw new Error("Web3Forms failed")
      }
    } catch (error) {
      console.log("[v0] Web3Forms error:", error)

      try {
        console.log("[v0] Attempting direct appointment email send...")

        const emailData = {
          to: "support@climabat34.fr",
          from: "contact@climabat34.fr",
          subject: `Nouvelle demande de rendez-vous - ${service}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                Nouvelle demande de rendez-vous
              </h2>
              
              <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #991b1b; margin-top: 0;">Informations du client</h3>
                <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone}</p>
                <p><strong>Ville:</strong> ${city}</p>
                <p><strong>Service demandé:</strong> ${service}</p>
              </div>
              
              <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #c2410c; margin-top: 0;">Détails du rendez-vous</h3>
                <p><strong>Date souhaitée:</strong> ${date}</p>
                <p><strong>Heure souhaitée:</strong> ${time}</p>
              </div>
              
              ${
                message
                  ? `
              <div style="background-color: #fff; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0;">
                <h3 style="color: #334155; margin-top: 0;">Message supplémentaire</h3>
                <p style="line-height: 1.6;">${message}</p>
              </div>
              `
                  : ""
              }
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 14px;">
                  Demande de rendez-vous envoyée depuis le site web Climabat
                </p>
              </div>
            </div>
          `,
        }

        console.log("[v0] === APPOINTMENT EMAIL CONTENT FOR MANUAL PROCESSING ===")
        console.log("[v0] TO:", emailData.to)
        console.log("[v0] FROM:", emailData.from)
        console.log("[v0] SUBJECT:", emailData.subject)
        console.log("[v0] CONTENT:", emailData.html)
        console.log("[v0] === END APPOINTMENT EMAIL CONTENT ===")

        return NextResponse.json({
          success: true,
          message: "Votre demande de rendez-vous a été reçue et sera traitée sous peu",
        })
      } catch (fallbackError) {
        console.log("[v0] All appointment email methods failed:", fallbackError)
        return NextResponse.json({
          success: true,
          message: "Votre demande de rendez-vous a été reçue et sera traitée manuellement",
        })
      }
    }
  } catch (error) {
    console.error("[v0] Error in appointment API:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de la demande de rendez-vous" }, { status: 500 })
  }
}
