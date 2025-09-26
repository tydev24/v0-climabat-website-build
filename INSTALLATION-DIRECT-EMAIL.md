# Installation des formulaires d'email direct

## Scripts PHP créés

J'ai créé deux scripts PHP qui envoient directement les emails à contact@climabat34.fr :

1. **contact-form.php** - Pour le formulaire de contact
2. **appointment-form.php** - Pour les demandes de rendez-vous

## Installation sur LWS

1. **Uploadez les fichiers PHP** dans le répertoire racine de votre site web sur LWS :
   - `contact-form.php`
   - `appointment-form.php`

2. **Vérifiez les permissions** : Les fichiers doivent être accessibles en lecture/exécution (chmod 644 ou 755)

3. **Testez l'envoi** : Les formulaires enverront maintenant directement les emails à contact@climabat34.fr

## Fonctionnalités

- **Emails HTML formatés** avec un design professionnel
- **Validation des champs** obligatoires
- **Headers CORS** pour fonctionner avec votre site
- **Fallback mailto** si l'envoi PHP échoue
- **Réponses JSON** pour l'interface utilisateur

## Avantages

- ✅ **Pas de service externe** - Fonctionne directement avec votre serveur LWS
- ✅ **Pas d'activation requise** - Contrairement à FormSubmit
- ✅ **Emails immédiats** - Arrivée directe dans votre boîte contact@climabat34.fr
- ✅ **Format professionnel** - Emails HTML bien formatés
- ✅ **Sécurisé** - Validation et protection contre le spam

Les formulaires fonctionneront immédiatement une fois les fichiers PHP uploadés sur votre serveur LWS.
