<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $course_id = $_GET['course_id'];

    if (empty($course_id)) {
        echo json_encode(["status" => "error", "message" => "Course ID is required."]);
        exit();
    }

    $stmt = $conn->prepare("
        SELECT 'announcement' AS type, title, content, created_at FROM announcements WHERE course_id = ?
        UNION ALL
        SELECT 'assignment', title, content, created_at FROM assignments WHERE course_id = ?
        UNION ALL
        SELECT 'comment', student_name AS title, content, created_at FROM comments WHERE course_id = ?
        ORDER BY created_at DESC
    ");
    $stmt->bind_param("iii", $course_id, $course_id, $course_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $streams = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["status" => "success", "streams" => $streams]);
}
?>