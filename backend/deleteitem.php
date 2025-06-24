<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


$conn = mysqli_connect("localhost", "root", "", "wits");
if (!$conn) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);


$name     = $data["itemName"]     ?? null;
$person   = $data["personName"]   ?? "";
$location = $data["itemLocation"] ?? "";
$lent     = isset($data["isLent"]) ? ($data["isLent"] ? 1 : 0) : null;
$date     = $data["selectedDate"] ?? null;


if (isset($name, $person, $location, $date, $lent)) {
    $stmt = mysqli_prepare($conn, "DELETE FROM track WHERE item_name=? AND person_name=? AND item_location=? AND is_lent=? AND selected_date=?");
    mysqli_stmt_bind_param($stmt, "sssds", $name, $person, $location, $lent, $date);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) > 0) {
        echo json_encode(["success" => true, "message" => "Item deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "No matching item found"]);
    }

    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
}

mysqli_close($conn);
?>
