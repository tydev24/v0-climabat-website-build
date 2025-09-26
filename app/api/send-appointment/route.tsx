import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Données reçues pour rendez-vous:", data)

    const urgencyIcon = data.urgency === "emergency" ? "🚨" : data.urgency === "urgent" ? "⚡" : "📅"

    try {
      const formspreeData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address || "Non spécifiée",
        city: data.city || "Non spécifiée",
        postal_code: data.postalCode || "",
        service_type: data.serviceType || "Non spécifié",
        urgency:
          data.urgency === "emergency"
            ? "🚨 URGENCE"
            : data.urgency === "urgent"
              ? "⚡ URGENT"
              : data.urgency || "Normale",
        preferred_date: data.preferredDate || "Non spécifiée",
        preferred_time: data.preferredTime || "Non spécifiée",
        description: data.description || "Aucune description fournie",
        _replyto: data.email,
        _subject: `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""}`,
        _format: "plain",
      }

      console.log("[v0] Tentative d'envoi de rendez-vous via Formspree...")

      const emailResponse = await fetch("https://formspree.io/f/xpwzgkqr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formspreeData),
      })

      if (emailResponse.ok) {
        console.log("[v0] Email de rendez-vous envoyé avec succès via Formspree")
        return NextResponse.json({
          success: true,
          message:
            "✅ Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons rapidement pour confirmer.",
          emailSent: true,
          method: "Formspree",
          timestamp: new Date().toISOString(),
        })
      } else {
        throw new Error(`Formspree failed: ${emailResponse.status}`)
      }
    } catch (emailError) {
      console.error("[v0] Erreur Formspree pour rendez-vous:", emailError)

      try {
        console.log("[v0] Tentative avec Web3Forms pour rendez-vous...")

        const web3FormsData = {
          access_key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // Demo key for testing
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: data.address || "Non spécifiée",
          city: data.city || "Non spécifiée",
          postal_code: data.postalCode || "",
          service_type: data.serviceType || "Non spécifié",
          urgency:
            data.urgency === "emergency"
              ? "🚨 URGENCE"
              : data.urgency === "urgent"
                ? "⚡ URGENT"
                : data.urgency || "Normale",
          preferred_date: data.preferredDate || "Non spécifiée",
          preferred_time: data.preferredTime || "Non spécifiée",
          description: data.description || "Aucune description fournie",
          subject: `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""}`,
          from_name: "Site Climabat34",
          to_email: "contact@climabat34.fr",
        }

        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(web3FormsData),
        })

        if (web3Response.ok) {
          console.log("[v0] Email de rendez-vous envoyé avec succès via Web3Forms")
          return NextResponse.json({
            success: true,
            message:
              "✅ Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons rapidement pour confirmer.",
            emailSent: true,
            method: "Web3Forms",
            timestamp: new Date().toISOString(),
          })
        } else {
          throw new Error(`Web3Forms failed: ${web3Response.status}`)
        }
      } catch (web3Error) {
        console.error("[v0] Erreur Web3Forms pour rendez-vous:", web3Error)

        const mailtoSubject = encodeURIComponent(
          `${urgencyIcon} Demande RDV - ${data.serviceType || "Service"} - ${data.firstName} ${data.lastName} ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : ""}`,
        )
        const mailtoBody = encodeURIComponent(`
Nouvelle demande de rendez-vous :

Informations du client :
- Nom complet : ${data.firstName} ${data.lastName}
- Email : ${data.email}
- Téléphone : ${data.phone}

Adresse d'intervention :
${data.address || "Non spécifiée"}
${data.city || "Non spécifiée"} ${data.postalCode || ""}

Détails de l'intervention :
- Service : ${data.serviceType || "Non spécifié"}
- Urgence : ${data.urgency === "emergency" ? "🚨 URGENCE" : data.urgency === "urgent" ? "⚡ URGENT" : data.urgency || "Normale"}
- Date souhaitée : ${data.preferredDate || "Non spécifiée"}
- Heure souhaitée : ${data.preferredTime || "Non spécifiée"}

Description du problème :
${data.description || "Aucune description fournie"}

---
Demande reçue via le site web Climabat34.fr
Date : ${new Date().toLocaleString("fr-FR")}
        `)

        const mailtoLink = `mailto:contact@climabat34.fr?subject=${mailtoSubject}&body=${mailtoBody}`

        console.log("[v0] Services d'email indisponibles, création du lien mailto pour rendez-vous")
        console.log("[v0] Lien mailto créé avec succès")

        return NextResponse.json({
          success: true,
          message: "✅ Votre demande a été préparée ! Un email va s'ouvrir pour finaliser l'envoi.",
          emailSent: false,
          method: "Mailto",
          mailtoLink: mailtoLink,
          timestamp: new Date().toISOString(),
        })
      }
    }
  } catch (error) {
    console.error("[v0] Erreur lors du traitement du rendez-vous:", error)

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
