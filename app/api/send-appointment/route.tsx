import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Données reçues pour rendez-vous:", data)

    const urgencyIcon = data.urgency === "emergency" ? "🚨" : data.urgency === "urgent" ? "⚡" : "📅"
    const urgencyColor = data.urgency === "emergency" ? "#dc2626" : data.urgency === "urgent" ? "#f59e0b" : "#2563eb"

    const emailContent = {
      to: "contact@climabat34.fr",
      from: "contact@climabat34.fr",
      subject: `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: ${urgencyColor}; margin-bottom: 20px; border-bottom: 2px solid ${urgencyColor}; padding-bottom: 10px;">
              ${urgencyIcon} Demande de rendez-vous
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Informations du client :</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 30%;">Nom complet :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Téléphone :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Adresse d'intervention :</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; border-radius: 5px;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">
                  ${data.address || "Non spécifiée"}<br>
                  ${data.city || "Non spécifiée"} ${data.postalCode || ""}
                </p>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Détails de l'intervention :</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 30%;">Service :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.serviceType || "Non spécifié"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Urgence :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; color: ${urgencyColor}; font-weight: bold;">
                    ${urgencyIcon} ${data.urgency === "emergency" ? "URGENCE" : data.urgency === "urgent" ? "URGENT" : data.urgency || "Normale"}
                  </td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Date souhaitée :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.preferredDate || "Non spécifiée"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Heure souhaitée :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.preferredTime || "Non spécifiée"}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Description du problème :</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid ${urgencyColor}; border-radius: 5px;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">${data.description || "Aucune description fournie"}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Demande reçue via le site web Climabat34.fr</p>
              <p>Date : ${new Date().toLocaleString("fr-FR")}</p>
            </div>
          </div>
        </div>
      `,
      text: `
Nouvelle demande de rendez-vous

Client: ${data.firstName} ${data.lastName}
Email: ${data.email}
Téléphone: ${data.phone}

Adresse d'intervention:
${data.address || "Non spécifiée"}
${data.city || "Non spécifiée"} ${data.postalCode || ""}

Service: ${data.serviceType || "Non spécifié"}
Urgence: ${data.urgency || "Non spécifiée"}
Date souhaitée: ${data.preferredDate || "Non spécifiée"}
Heure souhaitée: ${data.preferredTime || "Non spécifiée"}

Description:
${data.description || "Aucune description fournie"}

Date: ${new Date().toLocaleString("fr-FR")}
      `.trim(),
    }

    console.log("[v0] Email de rendez-vous formaté avec succès")
    console.log("[v0] Contenu de l'email:", emailContent)

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY || "re_demo_key"}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Climabat34 <onboarding@resend.dev>", // Utilise l'adresse par défaut de Resend
          to: ["contact@climabat34.fr"],
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Email de rendez-vous envoyé avec succès via Resend:", result)

        return NextResponse.json({
          success: true,
          message:
            "✅ Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons rapidement pour confirmer.",
          emailSent: true,
          timestamp: new Date().toISOString(),
          emailId: result.id,
        })
      } else {
        const error = await response.json()
        console.error("[v0] Erreur Resend pour rendez-vous:", error)
        throw new Error(`Erreur Resend: ${error.message}`)
      }
    } catch (emailError) {
      console.error("[v0] Erreur lors de l'envoi de l'email de rendez-vous:", emailError)

      const mailtoLink = `mailto:contact@climabat34.fr?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.text)}`

      return NextResponse.json({
        success: true,
        message: "✅ Votre demande de rendez-vous a été préparée ! Un client email va s'ouvrir pour finaliser l'envoi.",
        emailSent: false,
        fallback: true,
        mailtoLink,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Erreur lors du traitement du rendez-vous:", error)

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur lors de l'envoi de votre demande. Veuillez réessayer.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
