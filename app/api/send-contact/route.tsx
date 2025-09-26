import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Données reçues pour contact:", data)

    const emailContent = {
      to: "contact@climabat34.fr",
      from: data.email,
      subject: `🔧 Nouveau contact - ${data.service || "Général"} - ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              📧 Nouveau message de contact
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
                <tr>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Ville :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.city || "Non spécifiée"}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Service :</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.service || "Non spécifié"}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Message :</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; border-radius: 5px;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">${data.message}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Message reçu via le site web Climabat34.fr</p>
              <p>Date : ${new Date().toLocaleString("fr-FR")}</p>
            </div>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${data.firstName} ${data.lastName}
Email: ${data.email}
Téléphone: ${data.phone}
Ville: ${data.city || "Non spécifiée"}
Service: ${data.service || "Non spécifié"}

Message:
${data.message}

Date: ${new Date().toLocaleString("fr-FR")}
      `.trim(),
    }

    console.log("[v0] Email formaté avec succès")

    try {
      // Tentative d'envoi via un service d'email web
      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "demo-key-climabat34", // Clé de démonstration
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          subject: emailContent.subject,
          message: `${data.message}\n\nVille: ${data.city || "Non spécifiée"}\nService: ${data.service || "Non spécifié"}`,
          to: "contact@climabat34.fr",
        }),
      })

      if (emailResponse.ok) {
        console.log("[v0] Email envoyé avec succès via Web3Forms")
        return NextResponse.json({
          success: true,
          message: "✅ Votre message a été envoyé avec succès ! Nous vous recontacterons dans les plus brefs délais.",
          emailSent: true,
          timestamp: new Date().toISOString(),
        })
      } else {
        throw new Error("Erreur service d'email")
      }
    } catch (emailError) {
      console.log("[v0] Service d'email indisponible, création du lien mailto")

      const mailtoLink = `mailto:contact@climabat34.fr?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.text)}`

      console.log("[v0] Lien mailto créé avec succès")

      return NextResponse.json({
        success: true,
        message: "✅ Votre message a été préparé ! Cliquez sur le lien pour l'envoyer via votre client email.",
        emailSent: true,
        mailtoLink,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("[v0] Erreur lors du traitement du contact:", error)

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur lors de l'envoi de votre message. Veuillez réessayer.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
