# Installation du système d'email SMTP

## Configuration pour LWS

1. **Uploadez les fichiers sur votre serveur LWS :**
   - `send-email-smtp.php` dans le répertoire racine de votre site
   - Tous les autres fichiers du site

2. **Configuration SMTP :**
   Le script utilise vos identifiants :
   - **Email :** contact@climabat34.fr
   - **Mot de passe :** Climabat34@
   - **Serveur SMTP :** mail.climabat34.fr (ou smtp.lws.fr)
   - **Port :** 587 (STARTTLS) ou 465 (SSL)

3. **Vérification :**
   - Testez les formulaires de contact et de rendez-vous
   - Les emails devraient arriver directement dans votre boîte contact@climabat34.fr
   - En cas d'échec SMTP, le système utilise la fonction mail() de PHP en fallback

## Dépannage

Si les emails n'arrivent toujours pas :

1. **Vérifiez les paramètres SMTP LWS :**
   - Connectez-vous à votre espace client LWS
   - Vérifiez les paramètres SMTP de votre domaine
   - Le serveur peut être `smtp.lws.fr` au lieu de `mail.climabat34.fr`

2. **Testez manuellement :**
   - Configurez un client email (Outlook, Thunderbird) avec les mêmes paramètres
   - Vérifiez que l'envoi fonctionne manuellement

3. **Logs d'erreur :**
   - Consultez les logs d'erreur PHP de votre hébergement LWS
   - Les erreurs SMTP y seront visibles

## Alternative simple

Si le SMTP ne fonctionne pas, vous pouvez utiliser l'ancien script `send-email.php` qui utilise la fonction `mail()` standard de PHP.
