# Configuration Nodemailer pour Climabat.34

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` ou dans les paramètres de votre hébergeur :

\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application
\`\`\`

## Configuration Gmail

1. **Activer l'authentification à 2 facteurs** sur votre compte Gmail
2. **Générer un mot de passe d'application** :
   - Allez dans les paramètres de votre compte Google
   - Sécurité → Authentification à 2 facteurs → Mots de passe des applications
   - Générez un mot de passe pour "Mail"
   - Utilisez ce mot de passe dans `SMTP_PASS`

## Autres fournisseurs SMTP

### OVH
\`\`\`env
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=contact@climabat34.fr
SMTP_PASS=votre-mot-de-passe
\`\`\`

### Outlook/Hotmail
\`\`\`env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=votre-email@outlook.com
SMTP_PASS=votre-mot-de-passe
\`\`\`

## Test de fonctionnement

Une fois configuré :
1. Les emails seront envoyés directement via Nodemailer
2. En cas d'erreur, le système utilisera le fallback mailto
3. Les emails arrivent à `contact@climabat34.fr` avec un design professionnel
4. Le champ "Répondre à" est automatiquement configuré avec l'email du client

## Avantages de cette solution

- ✅ Emails HTML professionnels avec design
- ✅ Pas de limite d'envoi (selon votre fournisseur SMTP)
- ✅ Fonctionne avec tous les hébergeurs
- ✅ Fallback automatique en cas de problème
- ✅ Configuration simple avec variables d'environnement
