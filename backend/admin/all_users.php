<?php

include '../db_connection.php';

if (!isset($conn)) {
    die('Database connection is not established.');
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$sql = "SELECT id AS user_id, username AS name, role, is_banned FROM users";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    $conn->close();
    exit;
}

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
$conn->close();
?>
