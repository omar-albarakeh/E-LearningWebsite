<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$user_id = 1; 

$sql = "SELECT c.id AS course_id, c.name AS course_name 
        FROM courses c 
        INNER JOIN enrollments e ON c.id = e.course_id 
        WHERE e.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
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
