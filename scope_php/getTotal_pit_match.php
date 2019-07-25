<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['team']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);

    $sql2="SELECT 'id' FROM teams WHERE scout_team='$teamnumber' and scout_name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    $team=(Integer)mysqli_num_rows($result2);

    $sql2="SELECT 'id' FROM matchperformance WHERE scout_team='$teamnumber' and scout_name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    $match=(Integer)mysqli_num_rows($result2);

    $total=$team+$match;
    echo '{
        "m":"'.$total.'"
    }';
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>