import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import WhatsAppFloat from "@/components/whatsapp-float"
import "./globals.css"

export const metadata: Metadata = {
  title: "Climabat.34 - Chauffage, Climatisation & Ventilation dans l'Hérault",
  description:
    "Expert en solutions de confort thermique dans l'Hérault. Installation, maintenance et dépannage de systèmes de chauffage, climatisation et ventilation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}
