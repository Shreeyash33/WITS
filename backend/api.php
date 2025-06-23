<?php
$insert = false;
if(isset($_POST['name'])){
    $insert = true;
    $server = "localhost";
    $username = "root";
    $password = "";
    $con = mysqli_connect($server, $username, $password);
    if(!$con){
        die("connection to this database failed due to" . mysqli_connect_error());
    }
    // echo "Success connecting to the database";
    $id = $_POST['ID'];
    $item = $_POST['Item_Name'];
    $person = $_POST['Person_Name'];
    $location = $_POST['Location'];
    $lent = $_POST['Lent'];
    $data = $_POST['Data'];
    $sql = "INSERT INTO `wits` . `track` (`ID`, `Item_Name`, `Person_Name`, `Location`, `Lent`, `Data`) VALUES ('$id', '$item', '$person', '$location', '$lent', '$data');"; 
    // echo $sql; 
    if($con->query($sql) == true){
        $insert = true;
        // echo "Successfully inserted";
    }
    else{
        echo "ERROR: $sql <br> $con->error";
    }
    $con->close();
}
?>

