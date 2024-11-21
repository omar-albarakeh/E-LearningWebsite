<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['course_id'];
    $title = $input['title'];
    $description = $input['description'];
    $due_date = $input['due_date'];

    $stmt = $conn->prepare("INSERT INTO assignments (course_id, title, description, due_date, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("isss", $course_id, $title, $description, $due_date);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Assignment posted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to post assignment."]);
    }
}
?>
