export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city?: string
  service?: string
  message: string
}

export interface AppointmentFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  postalCode?: string
  serviceType?: string
  urgency?: string
  preferredDate?: string
  preferredTime?: string
  description?: string
  acceptTerms: boolean
}

export async function sendContactForm(data: ContactFormData) {
  try {
    console.log("[v0] Envoi du formulaire de contact:", data)

    const templateParams = {
      from_name: `${data.firstName} ${data.lastName}`,
      from_email: data.email,
      phone: data.phone,
      city: data.city || "Non spécifiée",
      service: data.service || "Non spécifié",
      message: data.message,
      to_email: "contact@climabat34.fr",
    }

    // Using EmailJS service which works with static hosting
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_climabat34",
        template_id: "template_contact",
        user_id: "climabat34_user",
        template_params: templateParams,
      }),
    })

    if (response.ok) {
      console.log("[v0] Email envoyé avec succès")
      return {
        success: true,
        message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
      }
    } else {
      throw new Error("Service d'email temporairement indisponible")
    }
  } catch (error) {
    console.log("[v0] Erreur lors de l'envoi:", error)

    const subject = encodeURIComponent(`Contact - ${data.service || "Général"}`)
    const body = encodeURIComponent(
      `Nom: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Téléphone: ${data.phone}\n` +
        `Ville: ${data.city || "Non spécifiée"}\n` +
        `Service: ${data.service || "Non spécifié"}\n\n` +
        `Message:\n${data.message}`,
    )

    window.location.href = `mailto:contact@climabat34.fr?subject=${subject}&body=${body}`

    return {
      success: true,
      message: "Votre client email s'est ouvert avec le message pré-rempli. Cliquez sur 'Envoyer' pour nous contacter.",
    }
  }
}

export async function sendAppointmentForm(data: AppointmentFormData) {
  try {
    console.log("[v0] Envoi du formulaire de rendez-vous:", data)

    const templateParams = {
      from_name: `${data.firstName} ${data.lastName}`,
      from_email: data.email,
      phone: data.phone,
      address: data.address || "Non spécifiée",
      city: data.city || "Non spécifiée",
      postal_code: data.postalCode || "Non spécifié",
      service_type: data.serviceType || "Non spécifié",
      urgency: data.urgency || "Non spécifiée",
      preferred_date: data.preferredDate || "Non spécifiée",
      preferred_time: data.preferredTime || "Non spécifiée",
      description: data.description || "Aucune description fournie",
      to_email: "contact@climabat34.fr",
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_climabat34",
        template_id: "template_appointment",
        user_id: "climabat34_user",
        template_params: templateParams,
      }),
    })

    if (response.ok) {
      console.log("[v0] Demande de rendez-vous envoyée avec succès")
      return {
        success: true,
        message:
          "Votre demande de rendez-vous a été envoyée avec succès. Nous vous contacterons rapidement pour confirmer.",
      }
    } else {
      throw new Error("Service d'email temporairement indisponible")
    }
  } catch (error) {
    console.log("[v0] Erreur lors de l'envoi:", error)

    const subject = encodeURIComponent(`Demande de rendez-vous - ${data.serviceType || "Service général"}`)
    const body = encodeURIComponent(
      `Nom: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Téléphone: ${data.phone}\n` +
        `Adresse: ${data.address || "Non spécifiée"}\n` +
        `Ville: ${data.city || "Non spécifiée"}\n` +
        `Code postal: ${data.postalCode || "Non spécifié"}\n` +
        `Type de service: ${data.serviceType || "Non spécifié"}\n` +
        `Urgence: ${data.urgency || "Non spécifiée"}\n` +
        `Date préférée: ${data.preferredDate || "Non spécifiée"}\n` +
        `Heure préférée: ${data.preferredTime || "Non spécifiée"}\n\n` +
        `Description:\n${data.description || "Aucune description fournie"}`,
    )

    window.location.href = `mailto:contact@climabat34.fr?subject=${subject}&body=${body}`

    return {
      success: true,
      message:
        "Votre client email s'est ouvert avec la demande pré-remplie. Cliquez sur 'Envoyer' pour nous contacter.",
    }
  }
}
