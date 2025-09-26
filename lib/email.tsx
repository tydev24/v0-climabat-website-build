import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: "mail.climabat34.fr", // Assuming this is the SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "contact@climabat34.fr",
    pass: "Climabat34@",
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export interface ContactEmailData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city?: string
  service?: string
  message: string
}

export interface AppointmentEmailData {
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
}

export async function sendContactEmail(data: ContactEmailData) {
  const { firstName, lastName, email, phone, city, service, message } = data

  const mailOptions = {
    from: "contact@climabat34.fr",
    to: "contact@climabat34.fr",
    replyTo: email,
    subject: `Nouvelle demande de contact - ${service || "Général"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Nouvelle demande de contact</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-bottom: 20px;">Informations du client</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Nom complet:</td>
              <td style="padding: 8px; background-color: white;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Email:</td>
              <td style="padding: 8px; background-color: white;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Téléphone:</td>
              <td style="padding: 8px; background-color: white;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Ville:</td>
              <td style="padding: 8px; background-color: white;">${city || "Non spécifiée"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Service demandé:</td>
              <td style="padding: 8px; background-color: white;">${service || "Non spécifié"}</td>
            </tr>
          </table>
          
          <h3 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              <strong>Email envoyé depuis le site web Climabat.34</strong><br>
              Date: ${new Date().toLocaleString("fr-FR")}<br>
              Répondre directement à: ${email}
            </p>
          </div>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendAppointmentEmail(data: AppointmentEmailData) {
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
  } = data

  const mailOptions = {
    from: "contact@climabat34.fr",
    to: "contact@climabat34.fr",
    replyTo: email,
    subject: `Nouvelle demande de rendez-vous - ${serviceType || "Service général"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Nouvelle demande de rendez-vous</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f8fafc;">
          <h2 style="color: #1e40af; margin-bottom: 20px;">Informations du client</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Nom complet:</td>
              <td style="padding: 8px; background-color: white;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Email:</td>
              <td style="padding: 8px; background-color: white;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Téléphone:</td>
              <td style="padding: 8px; background-color: white;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Adresse:</td>
              <td style="padding: 8px; background-color: white;">${address || "Non spécifiée"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Ville:</td>
              <td style="padding: 8px; background-color: white;">${city || "Non spécifiée"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Code postal:</td>
              <td style="padding: 8px; background-color: white;">${postalCode || "Non spécifié"}</td>
            </tr>
          </table>

          <h2 style="color: #1e40af; margin-bottom: 20px;">Détails de l'intervention</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Service demandé:</td>
              <td style="padding: 8px; background-color: white;">${serviceType || "Non spécifié"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Niveau d'urgence:</td>
              <td style="padding: 8px; background-color: white;">${urgency || "Normal"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Date souhaitée:</td>
              <td style="padding: 8px; background-color: white;">${preferredDate || "À définir"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #e2e8f0;">Heure souhaitée:</td>
              <td style="padding: 8px; background-color: white;">${preferredTime || "À définir"}</td>
            </tr>
          </table>
          
          ${
            description
              ? `
            <h3 style="color: #1e40af; margin-bottom: 15px;">Description:</h3>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 30px;">
              ${description.replace(/\n/g, "<br>")}
            </div>
          `
              : ""
          }
          
          <div style="padding: 15px; background-color: #dbeafe; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              <strong>Demande de rendez-vous envoyée depuis le site web Climabat.34</strong><br>
              Date: ${new Date().toLocaleString("fr-FR")}<br>
              Répondre directement à: ${email}
            </p>
          </div>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}
