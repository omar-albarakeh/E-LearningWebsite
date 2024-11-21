<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['user_id'];
    $type = $input['type']; 

    if ($type === 'student') {
        $stmt = $conn->prepare("UPDATE students SET status = 'inactive' WHERE student_id = ?");
    } elseif ($type === 'instructor') {
        $stmt = $conn->prepare("UPDATE instructors SET status = 'inactive' WHERE instructor_id = ?");
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid user type."]);
        exit();
    }

    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User banned successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to ban user."]);
    }
}
?>
