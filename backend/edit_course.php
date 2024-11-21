<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['course_id'];
    $course_name = $input['course_name'];
    $instructor_id = $input['instructor_id'];

    $stmt = $conn->prepare("UPDATE courses SET course_name = ?, instructor_id = ? WHERE course_id = ?");
    $stmt->bind_param("sii", $course_name, $instructor_id, $course_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Course updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update course."]);
    }
}
?>
