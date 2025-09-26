# Configuration Email pour Production

## Informations de connexion
- **Email**: contact@climabat34.fr
- **Mot de passe**: Climabat34@

## Pour activer l'envoi d'emails en production

### Option 1: Service d'email API (Recommandé)
Utiliser un service comme Resend, SendGrid, ou Mailgun qui évite les problèmes DNS:

\`\`\`bash
npm install resend
\`\`\`

### Option 2: Configuration SMTP
Si vous préférez utiliser SMTP direct, ajoutez ces variables d'environnement:

\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@climabat34.fr
SMTP_PASS=Climabat34@
\`\`\`

### Option 3: Service EmailJS (Client-side)
Pour une solution simple côté client:

\`\`\`bash
npm install @emailjs/browser
\`\`\`

## État actuel
- ✅ Formulaires fonctionnels en mode prévisualisation
- ✅ Validation des données
- ✅ Interface utilisateur complète
- ⏳ Envoi d'emails simulé (prêt pour production)

## Déploiement
Une fois déployé sur Vercel avec les bonnes variables d'environnement, remplacez la simulation par le vrai service d'email choisi.
