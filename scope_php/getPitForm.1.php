<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);

    $sql2="SELECT 'id' FROM teams WHERE teamnumber='$teamnumber' and name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    $team=(Integer)mysqli_num_rows($result2);

    $sql2="SELECT 'id' FROM matchperformance WHERE teamnumber='$teamnumber' and name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    $match=(Integer)mysqli_num_rows($result2);
    echo '{
        "m":"'.$team+$match.'"
    }';
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>