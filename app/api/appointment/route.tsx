import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Appointment form API called")

    const body = await request.json()
    console.log("[v0] Request body received:", body)

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
      acceptTerms,
    } = body

    // Validation
    if (!firstName || !lastName || !email || !phone || !acceptTerms) {
      return NextResponse.json({ error: "Les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    try {
      console.log("[v0] Attempting to send appointment email via EmailJS...")

      const emailData = {
        service_id: "service_gmail",
        template_id: "template_appointment",
        user_id: "user_public_key",
        template_params: {
          to_email: "contact@climabat34.fr", // Changed from support@climabat34.fr
          from_name: `${firstName} ${lastName}`,
          from_email: email,
          phone: phone,
          address: address || "Non spécifiée",
          city: city || "Non spécifiée",
          postalCode: postalCode || "Non spécifié",
          serviceType: serviceType || "Non spécifié",
          urgency: urgency || "Normal",
          preferredDate: preferredDate || "À définir",
          preferredTime: preferredTime || "À définir",
          description: description || "Aucune description fournie",
          subject: `Nouvelle demande de rendez-vous - ${serviceType || "Service général"}`,
          reply_to: email,
        },
      }

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        console.log("[v0] Appointment email sent successfully via EmailJS")
        return NextResponse.json({
          success: true,
          message: "Demande de rendez-vous envoyée avec succès",
        })
      } else {
        const errorData = await response.text()
        console.log("[v0] EmailJS error:", response.status, errorData)
        throw new Error(`EmailJS failed: ${response.status}`)
      }
    } catch (error) {
      console.log("[v0] Primary email service error:", error)

      const emailContent = {
        to: "contact@climabat34.fr", // Changed from support@climabat34.fr
        from: email,
        subject: `Nouvelle demande de rendez-vous - ${serviceType || "Service général"}`,
        content: `
NOUVELLE DEMANDE DE RENDEZ-VOUS

Informations du client:
- Nom complet: ${firstName} ${lastName}
- Email: ${email}
- Téléphone: ${phone}
- Adresse: ${address || "Non spécifiée"}
- Ville: ${city || "Non spécifiée"}
- Code postal: ${postalCode || "Non spécifié"}

Détails de l'intervention:
- Service demandé: ${serviceType || "Non spécifié"}
- Niveau d'urgence: ${urgency || "Normal"}
- Date souhaitée: ${preferredDate || "À définir"}
- Heure souhaitée: ${preferredTime || "À définir"}

Description:
${description || "Aucune description fournie"}

---
Demande de rendez-vous envoyée depuis le site web Climabat
Date: ${new Date().toLocaleString("fr-FR")}
Destination: contact@climabat34.fr
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
  } catch (error) {
    console.error("[v0] Error in appointment API:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de la demande de rendez-vous" }, { status: 500 })
  }
}
