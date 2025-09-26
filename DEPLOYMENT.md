# Guide de déploiement pour hébergement Apache

## Étapes de déploiement

### 1. Build du projet
\`\`\`bash
npm run build
\`\`\`

### 2. Upload des fichiers
- Uploader tout le contenu du dossier `out/` à la racine de votre hébergement web
- Le fichier `.htaccess` doit être à la racine du site

### 3. Configuration des formulaires

#### Option A: Formspree (Recommandé)
1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer deux formulaires:
   - Un pour le contact
   - Un pour les rendez-vous
3. Remplacer les endpoints dans `lib/form-service.ts`:
   \`\`\`ts
   const FORMSPREE_CONTACT_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"
   const FORMSPREE_APPOINTMENT_ENDPOINT = "https://formspree.io/f/YOUR_APPOINTMENT_ID"
   \`\`\`

#### Option B: Mailto (Fallback automatique)
- Si Formspree n'est pas configuré, les formulaires ouvriront automatiquement le client email
- Aucune configuration supplémentaire nécessaire

### 4. Configuration Apache
Le fichier `.htaccess` inclus configure automatiquement:
- Redirections pour les routes Next.js
- Compression GZIP
- Cache des fichiers statiques
- Headers de sécurité
- Gestion des erreurs 404/500

### 5. Test du site
- Vérifier que toutes les pages se chargent correctement
- Tester les formulaires de contact et de rendez-vous
- Vérifier les redirections des URLs

## Structure des fichiers uploadés
\`\`\`
/
├── .htaccess (configuration Apache)
├── index.html (page d'accueil)
├── contact.html
├── services.html
├── a-propos.html
├── realisations.html
├── rendez-vous.html
├── _next/ (fichiers Next.js)
├── images/ (images du site)
└── ... (autres fichiers statiques)
\`\`\`

## Dépannage

### Erreur 404 sur les pages
- Vérifier que le fichier `.htaccess` est bien uploadé
- Vérifier les permissions du fichier `.htaccess` (644)

### Formulaires ne fonctionnent pas
- Vérifier la configuration Formspree
- Tester le fallback mailto
- Vérifier la console du navigateur pour les erreurs

### Images ne se chargent pas
- Vérifier que le dossier `images/` est bien uploadé
- Vérifier les permissions des fichiers images

## Support
Pour toute question technique, contactez votre hébergeur LWS ou consultez leur documentation Apache.
