<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $scout_name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $event=mysqli_real_escape_string($conn,$_POST['event']);
    
    $sql3="UPDATE `manager_info` SET `currentEvent`='$event' WHERE teamnumber='$scout_team';";
    $updatepit=mysqli_query($conn,$sql3);

    $sql3="UPDATE `scout_info` SET `currentEvent`='$event'  WHERE teamnumber='$scout_team';";
    $updatepit=mysqli_query($conn,$sql3);

    echo '{
        "col_name":"No Value",
        "currentId":"No Value"
    }';

}   
else{
    echo '{
        "col_name":"No Value",
        "currentId:"No Value"
    }';
} 

?>