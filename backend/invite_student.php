<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['course_id'];
    $student_id = $input['student_id'];

    $check_stmt = $conn->prepare("SELECT * FROM course_students WHERE course_id = ? AND student_id = ?");
    $check_stmt->bind_param("ii", $course_id, $student_id);
    $check_stmt->execute();
    $result = $check_stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Student is already enrolled in this course."]);
    } else {
        $stmt = $conn->prepare("INSERT INTO course_students (course_id, student_id, enrolled_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("ii", $course_id, $student_id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Student invited successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to invite student."]);
        }
    }
}
?>
