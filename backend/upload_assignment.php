<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $course_id = $_POST['course_id'];
    $student_id = $_POST['student_id'];

    if (isset($_FILES['assignment'])) {
        $file = $_FILES['assignment'];
        $target_dir = "uploads/";
        $file_path = $target_dir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $file_path)) {
            $stmt = $conn->prepare("INSERT INTO assignments (course_id, student_id, file_path) VALUES (?, ?, ?)");
            $stmt->bind_param("iis", $course_id, $student_id, $file_path);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Assignment submitted successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Database error."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No file provided."]);
    }
}
?>
