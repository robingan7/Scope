<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['num']);
    
   
    
    $sql3="SELECT `pit_question` FROM `manager_info` WHERE teamnumber='$teamnumber';";
    $result=mysqli_query($conn, $sql3);
    $row = mysqli_fetch_assoc($result);

    $pit=$row['pit_question'];

    $sql3="SELECT `match_question` FROM `manager_info` WHERE teamnumber='$teamnumber';";
    $result=mysqli_query($conn, $sql3);
    $row = mysqli_fetch_assoc($result);

    $match=$row['match_question'];
        echo '
      {
         "m":"'.$match.'/'.$pit.'"
      }';
    
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>