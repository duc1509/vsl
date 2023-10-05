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

$sql = "SELECT username, mat_khau FROM login_accounts"; // Truy vấn dữ liệu từ cơ sở dữ liệu
$result = $conn->query($sql);

$accounts = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $account = array(
            "username" => $row["username"],
            "mat_khau" => $row["mat_khau"]
        );
        $accounts[] = $account;
    }
}

/*
if (!empty($accounts)) {
    // Đây bạn có thể thực hiện xử lý với mảng $accounts
} else {
    echo "Không có dữ liệu trong cơ sở dữ liệu.";
}
*/
$conn->close();

header("Content-Type: application/json"); // Đặt tiêu đề để trả về dữ liệu JSON
echo json_encode($accounts);
?>
