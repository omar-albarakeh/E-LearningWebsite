<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $instructor_id = $_GET['instructor_id'];

    $stmt = $conn->prepare("SELECT course_id, course_name FROM courses WHERE instructor_id = ?");
    $stmt->bind_param("i", $instructor_id);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["status" => "success", "data" => $data]);
}
?>
