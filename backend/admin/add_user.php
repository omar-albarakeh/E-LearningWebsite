<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

file_put_contents('php://stderr', print_r($data, true));

if (isset($data['name'], $data['role'], $data['password'])) {
    $username = $data['name'];
    $role = $data['role'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT); 

    $sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        echo json_encode(['message' => 'Failed to prepare SQL statement', 'error' => $conn->error]);
        $conn->close();
        exit;
    }

    $stmt->bind_param("sss", $username, $password, $role);

    if ($stmt->execute()) {
        $response = ['message' => 'User added successfully', 'user' => ['name' => $username, 'role' => $role]];
    } else {
        $response = ['message' => 'Error adding user', 'error' => $stmt->error];
    }

    $stmt->close();
} else {
    $response = ['message' => 'Invalid input data'];
}

echo json_encode($response);
$conn->close();
?>
