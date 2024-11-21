<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $student_id = $input['student_id'];
    $course_id = $input['course_id'];

    if (empty($student_id) || empty($course_id)) {
        echo json_encode(["status" => "error", "message" => "Invalid data provided."]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $student_id, $course_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Enrolled successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to enroll."]);
    }
}
?>
