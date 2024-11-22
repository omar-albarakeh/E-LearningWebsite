<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$course_id = $data['course_id'] ?? null;
$title = $data['title'] ?? null;
$description = $data['description'] ?? null;

if (!$course_id || !$title || !$description) {
    echo json_encode(['message' => 'Course ID, title, and description are required']);
    exit;
}

$sql = "INSERT INTO assignments (course_id, title, description) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $course_id, $title, $description);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Assignment added successfully']);
} else {
    echo json_encode(['message' => 'Error adding assignment', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
