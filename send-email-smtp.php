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

// Configuration SMTP avec vos identifiants
$smtp_host = 'mail.climabat34.fr'; // ou smtp.lws.fr selon votre configuration LWS
$smtp_port = 587; // ou 465 pour SSL
$smtp_username = 'contact@climabat34.fr';
$smtp_password = 'Climabat34@';
$from_email = 'contact@climabat34.fr';
$to_email = 'contact@climabat34.fr';

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

// Fonction d'envoi SMTP
function sendSMTPEmail($to, $subject, $message, $smtp_host, $smtp_port, $smtp_username, $smtp_password, $from_email) {
    // Créer la connexion socket
    $socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 30);
    
    if (!$socket) {
        return false;
    }
    
    // Lire la réponse initiale
    fgets($socket, 515);
    
    // Commandes SMTP
    $commands = [
        "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n",
        "STARTTLS\r\n",
        "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n",
        "AUTH LOGIN\r\n",
        base64_encode($smtp_username) . "\r\n",
        base64_encode($smtp_password) . "\r\n",
        "MAIL FROM: <$from_email>\r\n",
        "RCPT TO: <$to>\r\n",
        "DATA\r\n"
    ];
    
    // Exécuter les commandes
    foreach ($commands as $command) {
        fputs($socket, $command);
        $response = fgets($socket, 515);
        
        // Vérifier les erreurs critiques
        if (strpos($response, '5') === 0) {
            fclose($socket);
            return false;
        }
    }
    
    // Construire l'email complet
    $email_content = "From: $from_email\r\n";
    $email_content .= "To: $to\r\n";
    $email_content .= "Subject: $subject\r\n";
    $email_content .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_content .= "Date: " . date('r') . "\r\n";
    $email_content .= "\r\n";
    $email_content .= $message . "\r\n";
    $email_content .= ".\r\n";
    
    // Envoyer le contenu
    fputs($socket, $email_content);
    $response = fgets($socket, 515);
    
    // Terminer
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return strpos($response, '250') === 0;
}

// Essayer d'envoyer avec SMTP, sinon utiliser mail() en fallback
$success = sendSMTPEmail($to_email, $subject, $message, $smtp_host, $smtp_port, $smtp_username, $smtp_password, $from_email);

if (!$success) {
    // Fallback vers la fonction mail() standard
    $headers = [
        'From: ' . $from_email,
        'Reply-To: ' . $input['email'],
        'Content-Type: text/html; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $success = mail($to_email, $subject, $message, implode("\r\n", $headers));
}

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
