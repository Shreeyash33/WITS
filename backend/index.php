<?php
header("Access-Control-Allow-Origin:*");
header("content-Type: application/json");
$con = mysqli_connect("http://192.168.1.200/backend","root","","wits");
$response = array();
if($con){
    $sql = "select * from `track` ";
    $result = mysqli_query($con,$sql);
    if($result){    
        header("Content-Type: JSON");
        $i=0;
        while($row = mysqli_fetch_assoc($result)){
           $response[$i]['ID'] = $row['ID'];
           $response[$i]['Item_Name'] = $row['Item_Name'];
           $response[$i]['Person_Name'] = $row['Person_Name'];
           $response[$i]['Location'] = $row['Location'];
           $response[$i]['Lent'] = $row['Lent'];
           $response[$i]['Date'] = $row['Date'];
           $i++;

        }
        echo json_encode($response,JSON_PRETTY_PRINT);
    }
    else{
        echo "Query Failed!";
    }
}
else{
    echo "Database Connection Failed";
}
?>


