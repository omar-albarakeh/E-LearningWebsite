<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['course_id'];
    $student_id = $input['student_id'];
    $content = $input['content'];
    $is_private = $input['is_private'];

    $stmt = $conn->prepare("INSERT INTO comments (course_id, student_id, content, is_private) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iisi", $course_id, $student_id, $content, $is_private);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Comment posted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to post comment."]);
    }
}
?>
