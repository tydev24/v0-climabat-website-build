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

// Récupérer les données JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
    exit;
}

// Configuration email
$to = 'contact@climabat34.fr';
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Site Web Climabat <noreply@climabat34.fr>',
    'Reply-To: ' . ($data['email'] ?? 'noreply@climabat34.fr'),
    'X-Mailer: PHP/' . phpversion()
];

// Déterminer le type de formulaire et créer le message
if (isset($data['serviceType']) || isset($data['preferredDate'])) {
    // Formulaire de rendez-vous
    $subject = 'Nouvelle demande de rendez-vous - ' . ($data['serviceType'] ?? 'Service général');
    
    $message = "
    <html>
    <head><title>Demande de rendez-vous</title></head>
    <body>
        <h2>Nouvelle demande de rendez-vous</h2>
        <p><strong>Nom:</strong> " . htmlspecialchars($data['firstName'] ?? '') . " " . htmlspecialchars($data['lastName'] ?? '') . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($data['email'] ?? '') . "</p>
        <p><strong>Téléphone:</strong> " . htmlspecialchars($data['phone'] ?? '') . "</p>
        <p><strong>Adresse:</strong> " . htmlspecialchars($data['address'] ?? '') . "</p>
        <p><strong>Ville:</strong> " . htmlspecialchars($data['city'] ?? '') . "</p>
        <p><strong>Code postal:</strong> " . htmlspecialchars($data['postalCode'] ?? '') . "</p>
        <p><strong>Type de service:</strong> " . htmlspecialchars($data['serviceType'] ?? '') . "</p>
        <p><strong>Urgence:</strong> " . htmlspecialchars($data['urgency'] ?? '') . "</p>
        <p><strong>Date préférée:</strong> " . htmlspecialchars($data['preferredDate'] ?? '') . "</p>
        <p><strong>Heure préférée:</strong> " . htmlspecialchars($data['preferredTime'] ?? '') . "</p>
        <p><strong>Description:</strong><br>" . nl2br(htmlspecialchars($data['description'] ?? '')) . "</p>
        <hr>
        <p><small>Message envoyé depuis le site web Climabat</small></p>
    </body>
    </html>";
    
} else {
    // Formulaire de contact
    $subject = 'Nouveau message de contact - ' . ($data['service'] ?? 'Général');
    
    $message = "
    <html>
    <head><title>Message de contact</title></head>
    <body>
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> " . htmlspecialchars($data['firstName'] ?? '') . " " . htmlspecialchars($data['lastName'] ?? '') . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($data['email'] ?? '') . "</p>
        <p><strong>Téléphone:</strong> " . htmlspecialchars($data['phone'] ?? '') . "</p>
        <p><strong>Ville:</strong> " . htmlspecialchars($data['city'] ?? '') . "</p>
        <p><strong>Service:</strong> " . htmlspecialchars($data['service'] ?? '') . "</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($data['message'] ?? '')) . "</p>
        <hr>
        <p><small>Message envoyé depuis le site web Climabat</small></p>
    </body>
    </html>";
}

// Envoyer l'email
$success = mail($to, $subject, $message, implode("\r\n", $headers));

if ($success) {
    echo json_encode([
        'success' => true, 
        'message' => 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.'
    ]);
}
?>
