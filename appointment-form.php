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
$address = $_POST['address'] ?? '';
$city = $_POST['city'] ?? '';
$postalCode = $_POST['postalCode'] ?? '';
$serviceType = $_POST['serviceType'] ?? '';
$urgency = $_POST['urgency'] ?? '';
$preferredDate = $_POST['preferredDate'] ?? '';
$preferredTime = $_POST['preferredTime'] ?? '';
$description = $_POST['description'] ?? '';

// Validation basique
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires']);
    exit;
}

// Configuration de l'email
$to = 'contact@climabat34.fr';
$subject = 'Demande de rendez-vous - ' . ($serviceType ?: 'Service général');

// Corps de l'email en HTML
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #e3f2fd; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .description-box { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
        .urgent { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nouvelle demande de rendez-vous - Climabat34</h2>
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
            <div class='label'>Adresse :</div>
            <div class='value'>" . ($address ?: 'Non spécifiée') . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Ville :</div>
            <div class='value'>" . ($city ?: 'Non spécifiée') . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Code postal :</div>
            <div class='value'>" . ($postalCode ?: 'Non spécifié') . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Type de service :</div>
            <div class='value'>" . ($serviceType ?: 'Non spécifié') . "</div>
        </div>";

if ($urgency === 'urgent') {
    $htmlBody .= "
        <div class='urgent'>
            <strong>⚠️ INTERVENTION URGENTE DEMANDÉE</strong>
        </div>";
}

$htmlBody .= "
        <div class='field'>
            <div class='label'>Niveau d'urgence :</div>
            <div class='value'>" . ($urgency ?: 'Non spécifié') . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Date préférée :</div>
            <div class='value'>" . ($preferredDate ?: 'Non spécifiée') . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Heure préférée :</div>
            <div class='value'>" . ($preferredTime ?: 'Non spécifiée') . "</div>
        </div>";

if ($description) {
    $htmlBody .= "
        <div class='description-box'>
            <div class='label'>Description du problème :</div>
            <div class='value'>" . nl2br(htmlspecialchars($description)) . "</div>
        </div>";
}

$htmlBody .= "
    </div>
</body>
</html>
";

// Corps de l'email en texte brut (fallback)
$textBody = "Nouvelle demande de rendez-vous - Climabat34\n\n";
$textBody .= "Nom complet : {$firstName} {$lastName}\n";
$textBody .= "Email : {$email}\n";
$textBody .= "Téléphone : {$phone}\n";
$textBody .= "Adresse : " . ($address ?: 'Non spécifiée') . "\n";
$textBody .= "Ville : " . ($city ?: 'Non spécifiée') . "\n";
$textBody .= "Code postal : " . ($postalCode ?: 'Non spécifié') . "\n";
$textBody .= "Type de service : " . ($serviceType ?: 'Non spécifié') . "\n";
$textBody .= "Urgence : " . ($urgency ?: 'Non spécifiée') . "\n";
$textBody .= "Date préférée : " . ($preferredDate ?: 'Non spécifiée') . "\n";
$textBody .= "Heure préférée : " . ($preferredTime ?: 'Non spécifiée') . "\n\n";
if ($description) {
    $textBody .= "Description :\n{$description}";
}

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
        'message' => 'Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons rapidement.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur lors de l\'envoi de votre demande. Veuillez réessayer plus tard.'
    ]);
}
?>
