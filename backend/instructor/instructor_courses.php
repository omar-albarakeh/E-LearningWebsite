<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$instructor_id = 1;

$sql = "SELECT id AS course_id, name AS course_name 
        FROM courses 
        WHERE instructor_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $instructor_id);
$stmt->execute();
$result = $stmt->get_result();

$courses = [];
while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

echo json_encode($courses);
$stmt->close();
$conn->close();
?>
