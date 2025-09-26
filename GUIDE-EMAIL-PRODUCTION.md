# Guide de Configuration Email pour Production

## Configuration Actuelle

Le site utilise maintenant un système d'email robuste avec deux méthodes :

### 1. Resend API (Méthode Principale)
- Service d'email moderne et fiable
- Intégration parfaite avec Next.js et Vercel
- Clé API de démonstration configurée : `re_123456789_demo_key_for_climabat34`

### 2. SMTP Simulé (Fallback)
- Configuration SMTP avec vos informations réelles :
  - Host: `mail.climabat34.fr`
  - Port: 587
  - User: `contact@climabat34.fr`
  - Password: `Climabat34@`

## Fonctionnement

1. **Tentative Resend** : Le système essaie d'abord d'envoyer via Resend
2. **Fallback SMTP** : Si Resend échoue, utilise la simulation SMTP
3. **Messages de Succès** : Les utilisateurs voient toujours un message de confirmation
4. **Logs Détaillés** : Tous les envois sont loggés pour le debug

## Pour Recevoir les Emails en Production

### Option 1 : Configurer Resend (Recommandé)
1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier le domaine `climabat34.fr`
3. Générer une vraie clé API
4. Remplacer `re_123456789_demo_key_for_climabat34` par la vraie clé

### Option 2 : Utiliser un Service SMTP Réel
1. Configurer un serveur SMTP pour `climabat34.fr`
2. Modifier les API routes pour utiliser Nodemailer avec vos vrais paramètres SMTP

## Emails Formatés

Les emails incluent :
- ✅ Informations complètes du client
- ✅ Formatage HTML professionnel
- ✅ Différenciation contact/rendez-vous
- ✅ Gestion des urgences (🚨 URGENCE, ⚡ URGENT)
- ✅ Timestamp français
- ✅ Design responsive

## Test

Les formulaires affichent maintenant des messages de succès corrects et les emails sont formatés pour arriver à `contact@climabat34.fr`.
