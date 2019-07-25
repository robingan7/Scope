<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);
    $perference=$_POST['perference'];
    $teamnumber=mysqli_real_escape_string($conn,$_POST['scout_team']);

    for ($i = 0; $i < count($perference); ++$i){
        $temAA = mysqli_real_escape_string($conn,$perference[$i]);
        $perference[$i] = $temAA;
    } 

    if($role=="M"){
        $sqll="UPDATE `manager_info` SET `selectedPerference`='$perference' WHERE teamnumber='$teamnumber' AND name='$name';";
        $updatemanager=mysqli_query($conn,$sqll);

        if(mysqli_prepare($conn,$sqll)){
            echo '
      {
         "m":"'.$perference.$teamnumber.$name.$role.'"
      }';
        }
        
    }else if($role=="S"){
        $sqll="UPDATE `scout_info` SET `selectedPerference`='$perference' WHERE teamnumber='$teamnumber' AND name='$name';";
        $updateAllScout=mysqli_query($conn,$sqll);
        echo '
      {
         "m":"'.$perference.'"
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