# Configuration de l'envoi d'emails

## Option 1: Web3Forms (Recommandé - Gratuit)

1. Allez sur https://web3forms.com/
2. Créez un compte gratuit
3. Obtenez votre clé d'accès
4. Remplacez `YOUR_ACCESS_KEY_HERE` dans `lib/form-service.ts` par votre vraie clé

## Option 2: FormSubmit (Automatique - Aucune configuration)

Le système utilise automatiquement FormSubmit comme fallback. Aucune configuration nécessaire.

## Option 3: Configuration manuelle

Si vous préférez un autre service:
1. Modifiez l'URL dans `sendContactForm` et `sendAppointmentForm`
2. Adaptez les champs selon les exigences du service

## Test

Une fois configuré, testez les formulaires sur votre site. Les emails arriveront directement dans votre boîte de réception.
