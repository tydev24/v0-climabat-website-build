# Configuration Email pour Production

## Étapes pour recevoir les emails en production

### Option 1: Utiliser Resend (Recommandé)
1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier votre domaine `climabat34.fr`
3. Créer une clé API
4. Ajouter la variable d'environnement `RESEND_API_KEY` dans Vercel
5. Modifier les API routes pour utiliser `from: 'contact@climabat34.fr'` au lieu de l'adresse par défaut

### Option 2: Utiliser un autre service d'email
- **Mailgun**: Gratuit jusqu'à 100 emails/jour
- **SendGrid**: Gratuit jusqu'à 100 emails/jour
- **Brevo**: Gratuit jusqu'à 300 emails/jour

### Configuration actuelle
- Les emails sont formatés correctement avec toutes les informations
- Fallback automatique vers le client email local si l'envoi échoue
- Messages de succès appropriés affichés aux utilisateurs
- Logs détaillés pour le debugging

### Test en local
Les formulaires fonctionnent en mode simulation avec fallback vers mailto: pour tester l'interface utilisateur.

### Variables d'environnement nécessaires
\`\`\`
RESEND_API_KEY=your_resend_api_key_here
\`\`\`

Une fois configuré, les emails arriveront directement dans votre boîte `contact@climabat34.fr`.
