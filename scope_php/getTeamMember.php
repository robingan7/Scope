<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $result2="[";

    $sql3="SELECT `name` FROM scout_info WHERE teamnumber='$teamnumber' ORDER BY `scout_info`.`name` ASC;";
    $result=mysqli_query($conn, $sql3);

    if(mysqli_prepare($conn,$sql3)){
    while($rows = mysqli_fetch_assoc($result)){
        $result2.='"'.$rows['name'].'",';
    }

    $result2=substr($result2,0,strlen($result2)-1);
    $result2.="]";
    echo '
      {
         "m":'.$result2.'
      }';
    }
}
    
else{
    echo '{
        "m":"No Value"
    }';
} 
?>