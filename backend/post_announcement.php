<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['course_id'];
    $title = $input['title'];
    $content = $input['content'];

    $stmt = $conn->prepare("INSERT INTO announcements (course_id, title, content, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("iss", $course_id, $title, $content);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Announcement posted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to post announcement."]);
    }
}
?>
