<?php
// Kết nối đến cơ sở dữ liệu

header("Access-Control-Allow-Origin: *");
$host = "localhost";
$username = "root"; // Thay đổi username nếu cần
$password = ""; // Thay đổi password nếu cần
$dbname = "data_vls"; // Thay đổi tên database

$mysqli = new mysqli('localhost', 'root', '', 'data_vls');

if ($mysqli->connect_error) {
    die('Kết nối đến cơ sở dữ liệu thất bại: ' . $mysqli->connect_error);
}

// Nhận dữ liệu từ JavaScript
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$results = $data['results'];

// Chèn dữ liệu vào cơ sở dữ liệu
$sql = "INSERT INTO results (username, result) VALUES (?, ?)";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('ss', $username, $results);

if ($stmt->execute()) {
    echo 'Kết quả đã được lưu vào cơ sở dữ liệu.';
} else {
    echo 'Lỗi khi lưu kết quả vào cơ sở dữ liệu: ' . $stmt->error;
}

$stmt->close();
$mysqli->close();
?>
