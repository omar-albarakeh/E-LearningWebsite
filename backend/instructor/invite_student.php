<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$course_id = $data['course_id'] ?? null;
$email = $data['email'] ?? null;

if (!$course_id || !$email) {
    echo json_encode(['message' => 'Course ID and email are required']);
    exit;
}

$sql = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['message' => 'Student not found']);
    exit;
}

$user = $result->fetch_assoc();
$user_id = $user['id'];

$stmt->close();

$sql = "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $course_id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Student invited successfully']);
} else {
    echo json_encode(['message' => 'Error inviting student', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
