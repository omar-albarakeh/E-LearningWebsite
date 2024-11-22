<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$course_id = $_GET['course_id'] ?? null;

if (!$course_id) {
    echo json_encode(['message' => 'Course ID is required']);
    exit;
}

$sql = "SELECT id, title, description, created_at 
        FROM assignments 
        WHERE course_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $course_id);
$stmt->execute();
$result = $stmt->get_result();

$assignments = [];
while ($row = $result->fetch_assoc()) {
    $assignments[] = $row;
}

echo json_encode($assignments);
$stmt->close();
$conn->close();
?>
