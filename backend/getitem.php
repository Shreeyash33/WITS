<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// 1. Connect to database
$con = mysqli_connect("localhost", "root", "", "wits");
if (!$con) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}


$sql = "SELECT * FROM `track`";
$result = mysqli_query($con, $sql);


$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'ID' => $row['id'],
        'Item_Name' => $row['item_name'],
        'Person_Name' => $row['person_name'],
        'Location' => $row['item_location'],
        'Lent' => $row['is_lent'] ? true : false,
        'Date' => $row['selected_date']
    ];
}

echo json_encode($data, JSON_PRETTY_PRINT);

mysqli_close($con);
?>
