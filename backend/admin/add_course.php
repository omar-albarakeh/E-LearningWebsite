<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['course_name'], $data['description'], $data['instructor_id'])) {
    $title = $data['course_name'];
    $description = $data['description'];
    $instructor_id = $data['instructor_id'];

    $sql = "INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $title, $description, $instructor_id);

    if ($stmt->execute()) {
        $response = ['message' => 'Course added successfully', 'course' => ['course_name' => $title, 'description' => $description, 'instructor_id' => $instructor_id]];
    } else {
        $response = ['message' => 'Error adding course', 'error' => $stmt->error];
    }

    $stmt->close();
} else {
    $response = ['message' => 'Invalid input'];
}

echo json_encode($response);
$conn->close();
?>
