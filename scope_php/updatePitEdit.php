<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $col_name=mysqli_real_escape_string($conn,$_POST['col']);
    $value=mysqli_real_escape_string($conn,$_POST['value']);
    $id=mysqli_real_escape_string($conn,$_POST['id']);

    $sql="UPDATE `teams` SET `$col_name`='$value' WHERE id='$id';";
    $result=mysqli_query($conn,$sql);

    echo '{
        "col_name":"No Value",
        "currentId":""
    }';

}   
else{
    echo '{
        "col_name":"No Value",
        "currentId:"No Value"
    }';
} 

?>