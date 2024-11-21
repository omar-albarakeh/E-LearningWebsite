<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_name = $input['course_name'];
    $instructor_id = $input['instructor_id'];

    $stmt = $conn->prepare("INSERT INTO courses (course_name, instructor_id) VALUES (?, ?)");
    $stmt->bind_param("si", $course_name, $instructor_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Course created successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to create course."]);
    }
}
?>
