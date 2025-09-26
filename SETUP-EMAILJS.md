# Configuration EmailJS pour Climabat34

## Étapes de configuration

1. **Créer un compte EmailJS**
   - Aller sur https://www.emailjs.com/
   - Créer un compte gratuit

2. **Configurer le service email**
   - Dans le dashboard EmailJS, aller dans "Email Services"
   - Ajouter un nouveau service (Gmail, Outlook, etc.)
   - Utiliser l'email: contact@climabat34.fr
   - Noter le Service ID généré

3. **Créer les templates**
   
   **Template Contact (template_contact):**
   \`\`\`
   Nouveau message de contact
   
   Nom: {{from_name}}
   Email: {{from_email}}
   Téléphone: {{phone}}
   Ville: {{city}}
   Service: {{service}}
   
   Message:
   {{message}}
   \`\`\`
   
   **Template Rendez-vous (template_appointment):**
   \`\`\`
   Nouvelle demande de rendez-vous
   
   Nom: {{from_name}}
   Email: {{from_email}}
   Téléphone: {{phone}}
   Adresse: {{address}}
   Ville: {{city}}
   Code postal: {{postal_code}}
   Service: {{service_type}}
   Urgence: {{urgency}}
   Date préférée: {{preferred_date}}
   Heure préférée: {{preferred_time}}
   
   Description:
   {{description}}
   \`\`\`

4. **Obtenir les identifiants**
   - Service ID: remplacer "service_climabat34" dans le code
   - User ID: remplacer "climabat34_user" dans le code
   - Template IDs: remplacer "template_contact" et "template_appointment"

5. **Avantages**
   - Fonctionne avec l'hébergement statique
   - Pas de configuration serveur nécessaire
   - Emails reçus directement dans contact@climabat34.fr
   - Gratuit jusqu'à 200 emails/mois
</parameter>
