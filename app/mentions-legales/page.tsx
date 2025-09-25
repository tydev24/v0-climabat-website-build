import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Mentions légales - Climabat.34",
  description:
    "Mentions légales du site Climabat.34, spécialiste en chauffage, climatisation et ventilation dans l'Hérault.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Mentions légales</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations légales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Raison sociale :</h3>
                <p>CLIMA BAT</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Forme juridique :</h3>
                <p>SARL (Société à Responsabilité Limitée)</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Capital social :</h3>
                <p>100 000,00 €</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Siège social :</h3>
                <p>
                  LOUVOIE, 1 RUE DES PRES
                  <br />
                  51150 VAL DE LIVRE
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dirigeant :</h3>
                <p>Hilbert Adrien</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">SIREN :</h3>
                <p>538 991 670</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">SIRET :</h3>
                <p>538 991 670 00018</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Code NAF :</h3>
                <p>71.12B (Ingénierie, études techniques)</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Numéro de TVA intracommunautaire :</h3>
                <p>FR57538991670</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">RCS :</h3>
                <p>538 991 670 R.C.S. Reims</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Téléphone :</h3>
                <p>07 48 29 54 92</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email :</h3>
                <p>contact@climabat34.fr</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zone d'intervention :</h3>
                <p>Département de l'Hérault (34)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
                propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement
                remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous
                constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le
                signaler par email à contact@climabat34.fr en décrivant le problème de la manière la plus précise
                possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
