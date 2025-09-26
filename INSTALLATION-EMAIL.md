# Configuration de l'envoi d'emails

## Installation sur votre serveur Apache

1. **Copiez le fichier `send-email.php`** à la racine de votre site web (même niveau que index.html)

2. **Vérifiez que PHP est activé** sur votre hébergement LWS (normalement c'est le cas)

3. **Testez l'envoi d'emails** en remplissant un formulaire sur votre site

## Configuration email sur LWS

Si les emails ne sont pas envoyés, vérifiez dans votre panneau de contrôle LWS :

1. **Allez dans "Emails" > "Configuration"**
2. **Vérifiez que l'envoi d'emails PHP est activé**
3. **Assurez-vous que l'adresse `noreply@climabat34.fr` existe** ou modifiez le script PHP pour utiliser une adresse existante

## Alternative avec Formspree (gratuit)

Si PHP ne fonctionne pas, vous pouvez utiliser Formspree :

1. Allez sur https://formspree.io
2. Créez un compte gratuit
3. Créez un nouveau formulaire
4. Remplacez dans `lib/form-service.ts` :
   \`\`\`typescript
   const response = await fetch('/send-email.php', {
   \`\`\`
   par :
   \`\`\`typescript
   const response = await fetch('https://formspree.io/f/VOTRE_ID_FORMSPREE', {
   \`\`\`

## Test

Une fois installé, testez en remplissant un formulaire. Vous devriez recevoir l'email à `contact@climabat34.fr`.

En cas de problème, le système utilisera automatiquement le fallback mailto qui ouvrira votre client email.
