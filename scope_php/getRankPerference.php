<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);

   
    if($role=="M"){
        $sql3="SELECT `rankPerference` FROM `manager_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        echo '
      {
         "m":"'.$row['rankPerference'].'"
      }';
    }else if($role=="S"){
        $sql3="SELECT `rankPerference` FROM `scout_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        echo '
      {
         "m":"'.$row['rankPerference'].'"
      }';
    }
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>