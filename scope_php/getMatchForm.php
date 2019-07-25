<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $sql2="SELECT * FROM manager_info WHERE teamnumber='$teamnumber' and name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    if(mysqli_num_rows($result2)!=0){
        $sql3="SELECT `matchform` FROM `manager_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        echo '
      {
         "m":"'.$row['matchform'].'"
      }';
    }else{
        $sql3="SELECT `matchform` FROM `scout_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        echo '
      {
         "m":"'.$row['matchform'].'"
      }';
    }
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>