import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Politique de confidentialité - Climabat.34",
  description: "Politique de confidentialité et protection des données personnelles de Climabat.34, conforme au RGPD.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Politique de confidentialité</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collecte des données personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Nous collectons des données personnelles lorsque vous :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Remplissez notre formulaire de contact</li>
                <li>Demandez un devis ou un rendez-vous</li>
                <li>Souscrivez à un contrat d'entretien</li>
                <li>Nous contactez par téléphone ou email</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types de données collectées</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Les données personnelles que nous collectons peuvent inclure :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse postale</li>
                <li>Numéro de téléphone</li>
                <li>Adresse email</li>
                <li>Informations sur votre logement et vos équipements</li>
                <li>Historique des interventions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Finalités du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vos données personnelles sont utilisées pour :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Répondre à vos demandes de contact et de devis</li>
                <li>Planifier et réaliser nos interventions</li>
                <li>Assurer le suivi de nos prestations</li>
                <li>Gérer les contrats d'entretien</li>
                <li>Respecter nos obligations légales et comptables</li>
                <li>Améliorer nos services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Le traitement de vos données personnelles est fondé sur :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Votre consentement pour les demandes de contact</li>
                <li>L'exécution du contrat pour nos prestations</li>
                <li>Le respect d'obligations légales (facturation, garanties)</li>
                <li>Notre intérêt légitime pour l'amélioration de nos services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conservation des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vos données personnelles sont conservées :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Pendant la durée de notre relation commerciale</li>
                <li>3 ans après la fin de nos prestations pour les données clients</li>
                <li>1 an pour les demandes de contact non suivies d'effet</li>
                <li>10 ans pour les données comptables (obligation légale)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement ("droit à l'oubli")</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement</li>
              </ul>
              <p className="mt-4">Pour exercer ces droits, contactez-nous à : contact@climabat34.fr</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
                personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération
                ou la destruction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Notre site utilise des cookies techniques nécessaires au bon fonctionnement du site. Aucun cookie de
                traçage ou publicitaire n'est utilisé sans votre consentement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact et réclamations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits :</p>
              <p className="mt-2">
                <strong>Email :</strong> contact@climabat34.fr
                <br />
                <strong>Téléphone :</strong> 07 48 29 54 92
              </p>
              <p className="mt-4">
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de
                l'Informatique et des Libertés) si vous estimez que le traitement de vos données personnelles constitue
                une violation du RGPD.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. La version en vigueur est celle
                publiée sur notre site web. Dernière mise à jour : Septembre 2025.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
