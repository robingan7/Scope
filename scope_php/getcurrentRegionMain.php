<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $sql2="SELECT * FROM manager_info WHERE teamnumber='$teamnumber' AND name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    $sql3="SELECT `currentEvent` FROM `manager_info` WHERE teamnumber='$teamnumber';";
    $result=mysqli_query($conn, $sql3);
    $row = mysqli_fetch_assoc($result);
    $mmm=$row['currentEvent'];

    if(mysqli_num_rows($result2)!=0){
       // $sql3="SELECT `currentEvent` FROM `manager_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        echo '
      {
         "m":"'.$mmm.'"
      }';
    }else{
        $sql3="SELECT `currentEvent` FROM `scout_info` WHERE teamnumber='$teamnumber' AND name='$name';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);

        if($row['currentEvent']!=$mmm){
            $sql3="UPDATE `scout_info` set `currentEvent`='$mmm' WHERE teamnumber='$teamnumber' AND name='$name';";
            $result=mysqli_query($conn, $sql3);
        }
        echo '
      {
         "m":"'.$mmm.'"
      }';
    }
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>