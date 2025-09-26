# Installation sur LWS

## Étapes d'installation

1. **Téléchargez le dossier `out/`** généré par `npm run build`

2. **Uploadez tous les fichiers** du dossier `out/` vers votre espace web LWS via FTP ou le gestionnaire de fichiers

3. **Vérifiez que le fichier `send-email.php`** est bien présent à la racine de votre site

4. **Testez l'envoi d'emails** en utilisant les formulaires de contact et de rendez-vous

## Configuration email

Le script PHP utilise la fonction `mail()` native de PHP qui fonctionne automatiquement sur LWS.

Les emails seront envoyés à : `contact@climabat34.fr`

## Dépannage

Si les emails ne fonctionnent pas :

1. Vérifiez que PHP est activé sur votre hébergement LWS
2. Vérifiez que le fichier `send-email.php` a les bonnes permissions (644)
3. Consultez les logs d'erreur PHP dans votre panneau LWS

## Structure des fichiers

\`\`\`
votre-site/
├── index.html
├── send-email.php  ← Important : ce fichier doit être présent
├── _next/
├── contact/
└── autres fichiers...
