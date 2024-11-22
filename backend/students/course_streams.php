<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$course_id = $_GET['course_id'] ?? null;

if (!$course_id) {
    echo json_encode(['message' => 'Course ID is required']);
    exit;
}


$streams_sql = "SELECT id, content FROM announcements WHERE course_id = ?";
$stmt = $conn->prepare($streams_sql);
$stmt->bind_param("i", $course_id);
$stmt->execute();
$streams_result = $stmt->get_result();

$streams = [];
while ($row = $streams_result->fetch_assoc()) {
    $streams[] = $row;
}
$stmt->close();


$assignments_sql = "SELECT id, title, description FROM assignments WHERE course_id = ?";
$stmt = $conn->prepare($assignments_sql);
$stmt->bind_param("i", $course_id);
$stmt->execute();
$assignments_result = $stmt->get_result();

$assignments = [];
while ($row = $assignments_result->fetch_assoc()) {
    $assignments[] = $row;
}
$stmt->close();

$comments_sql = "SELECT id, content, is_private FROM comments WHERE course_id = ?";
$stmt = $conn->prepare($comments_sql);
$stmt->bind_param("i", $course_id);
$stmt->execute();
$comments_result = $stmt->get_result();

$comments = [];
while ($row = $comments_result->fetch_assoc()) {
    $comments[] = $row;
}
$stmt->close();

$response = [
    'streams' => $streams,
    'assignments' => $assignments,
    'comments' => $comments,
];

echo json_encode($response);
$conn->close();
?>
