<?php
include 'db.php';
header("Content-Type:applicaion/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'),true);
switch ($method){
    case 'POST':
        $ID = $input['id'];
        $ItemName = $input['ItemName'];
        $PersonName = $input['PersonName'];
        $Location = $input['Location'];
        $Lent = $input['Lent'];
        $Data = $input['Data'];


        $conn->query("INSERT INTO users(ID,ItemName,PersonName,Location,Lent,Data)VALUES('$ID','$ItemName','$PersonName',
        '$location','$Lent','$Date')");

        echo json_encode(["message" =>"User added successfully"]);


        break;


        case'DELETE';
        $ID = $_GET['ID'];
        $conn->query ("DELETE FROM users WHERE ID = $ID");
        echo json_encode(["message" => "User deleted successfully"]);
        break;

        default:
        echo json_encode(["message" => "Invalid request method"]);
        break;


}
$conn->close();
?>