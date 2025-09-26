<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupération des données POST
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$city = $_POST['city'] ?? '';
$service = $_POST['service'] ?? '';
$message = $_POST['message'] ?? '';

// Validation basique
if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires']);
    exit;
}

// Configuration de l'email
$to = 'contact@climabat34.fr';
$subject = 'Contact - ' . ($service ?: 'Général');

// Corps de l'email en HTML
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .message-box { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nouveau message de contact - Climabat34</h2>
        </div>
        
        <div class='field'>
            <div class='label'>Nom complet :</div>
            <div class='value'>{$firstName} {$lastName}</div>
        </div>
        
        <div class='field'>
            <div class='label'>Email :</div>
            <div class='value'>{$email}</div>
        </div>
        
        <div class='field'>
            <div class='label'>Téléphone :</div>
            <div class='value'>{$phone}</div>
        </div>
        
        <div class='field'>
            <div class='label'>Ville :</div>
            <div class='value'>" . ($city ?: 'Non spécifiée') . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Service demandé :</div>
            <div class='value'>" . ($service ?: 'Non spécifié') . "</div>
        </div>
        
        <div class='message-box'>
            <div class='label'>Message :</div>
            <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
    </div>
</body>
</html>
";

// Corps de l'email en texte brut (fallback)
$textBody = "Nouveau message de contact - Climabat34\n\n";
$textBody .= "Nom complet : {$firstName} {$lastName}\n";
$textBody .= "Email : {$email}\n";
$textBody .= "Téléphone : {$phone}\n";
$textBody .= "Ville : " . ($city ?: 'Non spécifiée') . "\n";
$textBody .= "Service demandé : " . ($service ?: 'Non spécifié') . "\n\n";
$textBody .= "Message :\n{$message}";

// En-têtes de l'email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@climabat34.fr\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi de l'email
if (mail($to, $subject, $htmlBody, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
    ]);
}
?>
