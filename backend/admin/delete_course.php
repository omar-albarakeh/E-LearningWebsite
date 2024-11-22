<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$courseId = $_GET['course_id'] ?? null;

if ($courseId) {
    $sql = "DELETE FROM courses WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $courseId);

    if ($stmt->execute()) {
        $response = ['message' => 'Course deleted successfully'];
    } else {
        $response = ['message' => 'Error deleting course', 'error' => $stmt->error];
    }

    $stmt->close();
} else {
    $response = ['message' => 'Invalid course ID'];
}

echo json_encode($response);
$conn->close();
?>
