<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$courseId = $_GET['course_id'] ?? null;
$data = json_decode(file_get_contents('php://input'), true);

if ($courseId && isset($data['course_name'], $data['description'])) {
    $title = $data['course_name'];
    $description = $data['description'];

    $sql = "UPDATE courses SET title = ?, description = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $title, $description, $courseId);

    if ($stmt->execute()) {
        $response = ['message' => 'Course updated successfully'];
    } else {
        $response = ['message' => 'Error updating course', 'error' => $stmt->error];
    }

    $stmt->close();
} else {
    $response = ['message' => 'Invalid input'];
}

echo json_encode($response);
$conn->close();
?>
