import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Climabat.34" className="h-8 w-auto" />
              <span className="text-xl font-bold">CLIMABAT.34</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Votre spécialiste en chauffage, climatisation et ventilation dans l'Hérault. Solutions de confort sur
              mesure depuis plus de 15 ans. Disponible 7 jours sur 7.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/chauffage" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Chauffage
                </Link>
              </li>
              <li>
                <Link href="/services/climatisation" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Climatisation
                </Link>
              </li>
              <li>
                <Link href="/services/ventilation" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Ventilation
                </Link>
              </li>
              <li>
                <Link href="/rendez-vous" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Prise de rendez-vous
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">07 48 29 54 92</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">contact@climabat34.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">Hérault (34)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">7 jours sur 7 - Urgences 24h/24</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Liens Utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/a-propos" className="text-slate-300 hover:text-orange-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Nos réalisations
                </Link>
              </li>
              <li>
                <Link
                  href="https://share.google/E9VrKOQ1vHISy1edA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  Avis Google
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Climabat.34. Tous droits réservés. | Chauffage, Climatisation & Ventilation dans l'Hérault
          </p>
        </div>
      </div>
    </footer>
  )
}
