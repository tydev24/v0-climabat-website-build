# Configuration Email pour Production

## Étapes pour recevoir les emails sur contact@climabat34.fr

### Option 1: EmailJS (Recommandée pour v0)
1. Créer un compte sur https://emailjs.com
2. Configurer un service email avec vos informations:
   - Email: contact@climabat34.fr
   - Mot de passe: Climabat34@
3. Créer les templates "template_contact" et "template_appointment"
4. Remplacer les IDs dans le code:
   - service_id: "service_climabat34"
   - user_id: "climabat34_user"

### Option 2: Configuration SMTP directe (Production)
Ajouter ces variables d'environnement:
\`\`\`
SMTP_HOST=smtp.votre-fournisseur.com
SMTP_PORT=587
SMTP_USER=contact@climabat34.fr
SMTP_PASS=Climabat34@
\`\`\`

### Option 3: Resend (Recommandée pour production)
1. Créer un compte sur https://resend.com
2. Vérifier le domaine climabat34.fr
3. Obtenir une clé API
4. Ajouter RESEND_API_KEY dans les variables d'environnement

## État actuel
- Les formulaires fonctionnent et affichent les messages de succès
- Les emails sont formatés correctement
- En cas d'échec, le client email local s'ouvre automatiquement
- Tous les emails sont dirigés vers contact@climabat34.fr
