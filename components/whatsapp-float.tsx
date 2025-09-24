"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat() {
  const phoneNumber = "33748295492" // +33 07 48 29 54 92 formatted for WhatsApp
  const message =
    "Bonjour, je souhaiterais obtenir des informations sur vos services de chauffage, climatisation et ventilation."

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Contactez-nous sur WhatsApp
      </span>
    </button>
  )
}
