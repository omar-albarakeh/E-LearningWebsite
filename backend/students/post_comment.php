<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$course_id = $data['course_id'] ?? null;
$content = $data['content'] ?? null;
$is_private = $data['isPrivate'] ?? false;

if (!$course_id || !$content) {
    echo json_encode(['message' => 'Course ID and content are required']);
    exit;
}

$user_id = 1;

$sql = "INSERT INTO comments (course_id, user_id, content, is_private) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisi", $course_id, $user_id, $content, $is_private);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Comment posted successfully']);
} else {
    echo json_encode(['message' => 'Error posting comment', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
