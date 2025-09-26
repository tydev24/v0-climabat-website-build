# Solution Email pour Production

## Problème actuel
L'environnement de prévisualisation v0 ne supporte pas les opérations DNS nécessaires pour Nodemailer (`dns.lookup is not implemented yet!`).

## Solution temporaire (actuelle)
- Les API routes simulent l'envoi d'email et ouvrent le client email local
- Toutes les données sont correctement formatées et loggées
- Le fallback mailto fonctionne parfaitement

## Solutions pour la production

### Option 1: Service d'email tiers (Recommandé)
Utiliser un service comme **Resend** (gratuit jusqu'à 3000 emails/mois) :

\`\`\`javascript
// Installer: npm install resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'contact@climabat34.fr',
  to: 'contact@climabat34.fr',
  subject: emailContent.subject,
  html: emailContent.html,
})
\`\`\`

### Option 2: EmailJS (Client-side)
Configuration simple côté client sans serveur :

\`\`\`javascript
// Installer: npm install @emailjs/browser
import emailjs from '@emailjs/browser'

emailjs.send('service_id', 'template_id', templateParams, 'public_key')
\`\`\`

### Option 3: Nodemailer en production
Si vous déployez sur Vercel/Netlify, Nodemailer fonctionnera :

\`\`\`javascript
// Variables d'environnement nécessaires :
// SMTP_HOST=mail.climabat34.fr
// SMTP_USER=contact@climabat34.fr  
// SMTP_PASS=Climabat34@
\`\`\`

## Configuration recommandée
1. Créer un compte Resend (gratuit)
2. Ajouter la clé API dans les variables d'environnement
3. Remplacer la simulation par l'appel Resend
4. Garder le fallback mailto en cas d'erreur

## Test
Les formulaires fonctionnent actuellement avec le fallback mailto qui ouvre votre client email avec toutes les informations pré-remplies.
