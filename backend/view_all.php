<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $type = $_GET['type'];

    switch ($type) {
        case 'students':
            $query = "SELECT student_id, name, email FROM students";
            break;
        case 'instructors':
            $query = "SELECT instructor_id, name, email FROM instructors";
            break;
        case 'courses':
            $query = "SELECT c.course_id, c.course_name, i.name as instructor FROM courses c JOIN instructors i ON c.instructor_id = i.instructor_id";
            break;
        default:
            echo json_encode(["status" => "error", "message" => "Invalid type. Use 'students', 'instructors', or 'courses'."]);
            exit();
    }

    $result = $conn->query($query);
    $data = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["status" => "success", "data" => $data]);
}
?>
