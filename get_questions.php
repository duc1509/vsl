<?php
header("Access-Control-Allow-Origin: *");
$host = "localhost";
$username = "root"; // Thay đổi username nếu cần
$password = ""; // Thay đổi password nếu cần
$dbname = "data_vls"; // Thay đổi tên database

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT question_text FROM questionss"; // Truy vấn dữ liệu từ cơ sở dữ liệu
$result = $conn->query($sql);

$questions = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row["question_text"];
    }
}


if (!empty($questions)) {
    echo "Phần tử đầu tiên của mảng: " . $questions[0];
} else {
echo "Không có dữ liệu trong cơ sở dữ liệu.";
}

$conn->close();

header("Content-Type: application/json"); // Đặt tiêu đề để trả về dữ liệu JSON
echo json_encode($questions);

?>