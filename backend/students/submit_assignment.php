<?php
include '../db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $assignment_id = $_POST['assignment_id'] ?? null;
    $file = $_FILES['file'] ?? null;

    if (!$assignment_id || !$file) {
        echo json_encode(['message' => 'Assignment ID and file are required']);
        exit;
    }

    $upload_dir = '../uploads/';
    $file_path = $upload_dir . basename($file['name']);

    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        $user_id = 1; 

        $sql = "INSERT INTO submissions (assignment_id, user_id, file_path) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis", $assignment_id, $user_id, $file_path);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Assignment submitted successfully']);
        } else {
            echo json_encode(['message' => 'Error submitting assignment', 'error' => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Failed to upload file']);
    }
}

$conn->close();
?>
