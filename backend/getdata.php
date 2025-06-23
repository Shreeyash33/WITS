<?php
include'db.php';
header("Content-Type:application/json");
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
$input=json_decode(file_get_content('php://input'),true);
switch($method){
    case 'GET';
    if(issets($GET['id']))
    $id=$_GET['id'];
$item_name=$_GET['itemnme']
    $result = $conn->query("SELECT id, item_name, person_name, location, lent, date FROM users WHERE id=$id");
    $data = $result->fetch_assoc();
            echo json_encode($data);
        } else {
            $result = $conn->query("SELECT * FROM users");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;



}