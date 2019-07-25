<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $scout_name=mysqli_real_escape_string($conn,$_POST['name']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $match=mysqli_real_escape_string($conn,$_POST['match']);
    $pit=mysqli_real_escape_string($conn,$_POST['pit']);
    
    $sql3="UPDATE `manager_info` SET `pit_question`='$pit' WHERE teamnumber='$scout_team' AND name='$scout_name';";
    $updatepit=mysqli_query($conn,$sql3);

    $sql3="UPDATE `manager_info` SET `match_question`='$match' WHERE teamnumber='$scout_team' AND name='$scout_name';";
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