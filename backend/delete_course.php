<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['course_id'];

    $stmt = $conn->prepare("DELETE FROM courses WHERE course_id = ?");
    $stmt->bind_param("i", $course_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Course deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete course."]);
    }
}
?>
