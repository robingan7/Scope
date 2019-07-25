<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);
    $perference=$_POST['perference'];
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);

    for ($i = 0; $i < count($perference); ++$i){
        $temAA = mysqli_real_escape_string($conn,$perference[$i]);
        $perference[$i] = $temAA;
    } 
    $result_pit="";
    for($i=0;$i<sizeof($perference);$i++){
        if($i==sizeof($perference)-1){
            $result_pit.=$perference[$i];
        }else{
            $result_pit.=$perference[$i]."/";
        }
    }
    if($role=="M"){
        $sql3="UPDATE `manager_info` SET `rankPerference`='$result_pit' WHERE teamnumber='$teamnumber' AND name='$name';";
        $updatemanager=mysqli_query($conn,$sql3);

        if(mysqli_prepare($conn,$sql3)){
            echo '
      {
         "m":"'.$result_pit.'"
      }';
        }
        
    }else if($role=="S"){
        $sql4="UPDATE `scout_info` SET `rankPerference`='$result_pit' WHERE teamnumber='$teamnumber' AND name='$name';";
        $updateAllScout=mysqli_query($conn,$sql4);
        echo '
      {
         "m":"'.$result_pit.'"
      }';
    }else{
        echo '
      {
         "m":"error"
      }';
    }
   
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>