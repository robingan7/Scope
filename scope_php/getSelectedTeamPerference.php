<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);

   
    if($role=="M"){
        $sql3="SELECT `selectedPerference` FROM `manager_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        echo '
      {
         "m":"'.$row['selectedPerference'].'"
      }';
    }else if($role=="S"){
        $sql3="SELECT `selectedPerference` FROM `scout_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        echo '
      {
         "m":"'.$row['selectedPerference'].'"
      }';
    }
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>