<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $name = $input['name'];
    $email = $input['email'];
    $course_id = $input['course_id'] ?? null;

    $stmt = $conn->prepare("INSERT INTO instructors (name, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $email);

    if ($stmt->execute()) {
        $instructor_id = $conn->insert_id;

        if ($course_id) {
            $assign_stmt = $conn->prepare("UPDATE courses SET instructor_id = ? WHERE course_id = ?");
            $assign_stmt->bind_param("ii", $instructor_id, $course_id);

            if ($assign_stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Instructor created and assigned to course."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to assign instructor to course."]);
            }
        } else {
            echo json_encode(["status" => "success", "message" => "Instructor created."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to create instructor."]);
    }
}
?>
