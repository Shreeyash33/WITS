<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// 1. Connect to the database
$con = mysqli_connect("localhost", "root", "", "wits");

if (!$con) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);


$id = $input["id"] ?? null;
$itemName = $input["itemName"] ?? '';
$personName = $input["personName"] ?? '';
$itemLocation = $input["itemLocation"] ?? '';
$isLent = $input["isLent"] ?? false;
$selectedDate = $input["selectedDate"] ?? date("Y-m-d H:i:s");
if ($itemName === '') {
    echo json_encode(["success" => false, "message" => "Item name is required"]);
    exit();
}
$isLent = $isLent ? 1 : 0;

$sql = "INSERT INTO track (id, item_name, person_name, item_location, is_lent, selected_date) 
        VALUES ('$id', '$itemName', '$personName', '$itemLocation', $isLent, '$selectedDate')";

if (mysqli_query($con, $sql)) {
    echo json_encode(["success" => true, "message" => "Item added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed", "error" => mysqli_error($con)]);
}

mysqli_close($con);
?>
