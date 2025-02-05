<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Email details
    $to      = "vladislav.danyliuk@gmail.com";
    $subject = "New Contact Form Submission";
    $body    = "Name: $name\nEmail: $email\nMessage:\n$message";
    
    // Note: The From header below is set to the sender's email.
    // Some servers may require a valid domain email in the From header.
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Attempt to send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Message sending failed. Please try again later.";
    }
}