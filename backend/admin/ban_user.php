<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$userId = $_GET['user_id'] ?? null;

if ($userId) {
    $sql = "UPDATE users SET is_banned = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        $response = ['message' => 'User banned successfully'];
    } else {
        $response = ['message' => 'Error banning user', 'error' => $stmt->error];
    }

    $stmt->close();
} else {
    $response = ['message' => 'Invalid user ID'];
}

echo json_encode($response);
$conn->close();
?>
