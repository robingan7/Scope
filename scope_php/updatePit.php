<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $col_name=mysqli_real_escape_string($conn,$_POST['id']);
    $value=mysqli_real_escape_string($conn,$_POST['value']);
    $scout_name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $currentPit=mysqli_real_escape_string($conn,$_POST['currentPit']);
    $sql2="SELECT * FROM teams WHERE scout_team='$scout_team' and scout_name='$scout_name' and teamnumber='$value';";
    $result2=mysqli_query($conn, $sql2);
    
    if($currentPit=="none"){
    if(mysqli_num_rows($result2)!=0){
        echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"none"
      }';
    }else{
        if($col_name=="teamnumber"){
            $date = date('Y-m-d');
            $sql3="INSERT INTO `teams`( `scout_name`, `scout_team`, `teamnumber`,`date2`) VALUES ('$scout_name','$scout_team','$value','$date');";
            $updatepit=mysqli_query($conn,$sql3);
            $sql2="SELECT * FROM teams WHERE scout_team='$scout_team' and scout_name='$scout_name' and teamnumber='$value';";
            $result2=mysqli_query($conn, $sql2);
            $row = mysqli_fetch_assoc($result2);
            echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"'.$row['id'].'"
      }';
        }
        else{
            echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"No Value"
      }';
        }
    }
}else{
    $date = date('Y-m-d');
    $sql3="UPDATE `teams` SET `$col_name`='$value' ,`date2`='$date' WHERE id='$currentPit';";
        $updatepit=mysqli_query($conn,$sql3);

        $sql2="SELECT * FROM teams WHERE id='$currentPit';";
        $result2=mysqli_query($conn, $sql2);
        $row = mysqli_fetch_assoc($result2);
        echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"'.$row['id'].'"
      }';
    
}
}   
else{
    echo '{
        "col_name":"No Value",
        "currentId:"No Value"
    }';
} 

?>