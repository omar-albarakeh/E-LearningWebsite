<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$course_id = $data['course_id'] ?? null;
$content = $data['content'] ?? null;

if (!$course_id || !$content) {
    echo json_encode(['message' => 'Course ID and content are required']);
    exit;
}

$sql = "INSERT INTO announcements (course_id, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $course_id, $content);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Announcement added successfully']);
} else {
    echo json_encode(['message' => 'Error adding announcement', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>

