<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $student_id = $_GET['student_id'];

    if (empty($student_id)) {
        echo json_encode(["status" => "error", "message" => "Student ID is required."]);
        exit();
    }

    $stmt = $conn->prepare("
        SELECT c.course_id, c.course_name, i.name as instructor 
        FROM courses c
        INNER JOIN student_courses sc ON c.course_id = sc.course_id
        INNER JOIN instructors i ON c.instructor_id = i.instructor_id
        WHERE sc.student_id = ?
    ");
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $courses = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["status" => "success", "courses" => $courses]);
}
?>
