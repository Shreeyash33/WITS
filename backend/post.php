<?php
include 'db.php';
header("Content-Type:applicaion/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'),true);
switch ($method){
    case 'POST':
        $ID = $input['ID'];
        $Item_Name = $input['Item_Name'];
        $Person_Name = $input['Person_Name'];
        $Location = $input['Location'];
        $Lent = $input['Lent'];
        $Date = $input['Date'];


        $conn->query("INSERT INTO users(ID,Item_name,Person_name,Location,Lent,Data)VALUES('$ID','$Item_name','$Person_name',
        '$Location','$Lent','$Date')");  

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