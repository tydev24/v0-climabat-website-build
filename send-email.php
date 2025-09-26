<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Configuration email
$to = 'contact@climabat34.fr';
$headers = [
    'From: noreply@climabat34.fr',
    'Reply-To: ' . $input['email'],
    'Content-Type: text/html; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// Déterminer le type de formulaire
$isAppointment = isset($input['address']) || isset($input['serviceType']);

if ($isAppointment) {
    // Formulaire de rendez-vous
    $subject = 'Nouvelle demande de rendez-vous - ' . ($input['serviceType'] ?? 'Service général');
    
    $message = "
    <html>
    <head><title>Demande de rendez-vous</title></head>
    <body>
        <h2>Nouvelle demande de rendez-vous</h2>
        
        <h3>Informations du client:</h3>
        <ul>
            <li><strong>Nom complet:</strong> " . htmlspecialchars($input['firstName'] . ' ' . $input['lastName']) . "</li>
            <li><strong>Email:</strong> " . htmlspecialchars($input['email']) . "</li>
            <li><strong>Téléphone:</strong> " . htmlspecialchars($input['phone']) . "</li>
            <li><strong>Adresse:</strong> " . htmlspecialchars($input['address'] ?? 'Non spécifiée') . "</li>
            <li><strong>Ville:</strong> " . htmlspecialchars($input['city'] ?? 'Non spécifiée') . "</li>
            <li><strong>Code postal:</strong> " . htmlspecialchars($input['postalCode'] ?? 'Non spécifié') . "</li>
        </ul>
        
        <h3>Détails de l'intervention:</h3>
        <ul>
            <li><strong>Service demandé:</strong> " . htmlspecialchars($input['serviceType'] ?? 'Non spécifié') . "</li>
            <li><strong>Niveau d'urgence:</strong> " . htmlspecialchars($input['urgency'] ?? 'Normal') . "</li>
            <li><strong>Date souhaitée:</strong> " . htmlspecialchars($input['preferredDate'] ?? 'À définir') . "</li>
            <li><strong>Heure souhaitée:</strong> " . htmlspecialchars($input['preferredTime'] ?? 'À définir') . "</li>
        </ul>
        
        <h3>Description:</h3>
        <p>" . nl2br(htmlspecialchars($input['description'] ?? 'Aucune description fournie')) . "</p>
        
        <hr>
        <p><small>Demande de rendez-vous envoyée depuis le site web Climabat<br>
        Date: " . date('d/m/Y H:i:s') . "</small></p>
    </body>
    </html>";
    
} else {
    // Formulaire de contact
    $subject = 'Nouvelle demande de contact - ' . ($input['service'] ?? 'Général');
    
    $message = "
    <html>
    <head><title>Demande de contact</title></head>
    <body>
        <h2>Nouvelle demande de contact</h2>
        
        <h3>Informations du client:</h3>
        <ul>
            <li><strong>Nom complet:</strong> " . htmlspecialchars($input['firstName'] . ' ' . $input['lastName']) . "</li>
            <li><strong>Email:</strong> " . htmlspecialchars($input['email']) . "</li>
            <li><strong>Téléphone:</strong> " . htmlspecialchars($input['phone']) . "</li>
            <li><strong>Ville:</strong> " . htmlspecialchars($input['city'] ?? 'Non spécifiée') . "</li>
            <li><strong>Service demandé:</strong> " . htmlspecialchars($input['service'] ?? 'Non spécifié') . "</li>
        </ul>
        
        <h3>Message:</h3>
        <p>" . nl2br(htmlspecialchars($input['message'])) . "</p>
        
        <hr>
        <p><small>Email envoyé depuis le site web Climabat<br>
        Date: " . date('d/m/Y H:i:s') . "</small></p>
    </body>
    </html>";
}

// Envoi de l'email
$success = mail($to, $subject, $message, implode("\r\n", $headers));

if ($success) {
    echo json_encode([
        'success' => true, 
        'message' => $isAppointment ? 'Demande de rendez-vous envoyée avec succès' : 'Message envoyé avec succès'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur lors de l\'envoi de l\'email'
    ]);
}
?>
