<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $region=mysqli_real_escape_string($conn,$_POST['region']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $squence=$_POST['squence'];

    for ($i = 0; $i < count($squence); ++$i){
        $temAA = mysqli_real_escape_string($conn,$squence[$i]);
        $squence[$i] = $temAA;
    }
    $debug="";
    foreach($squence as $squenceItem){
        $index=(Integer)explode('/',$squenceItem)[1];
        $teamnumber=(String)explode('/',$squenceItem)[0];

        $sql3="UPDATE `team_total` SET `rank`='$index' WHERE teamnumber='$teamnumber' AND region='$region' AND scout_team='$scout_team';";
        $updateselect=mysqli_query($conn,$sql3);
        
        $debug.=$teamnumber;
    }

    
    echo '{
        "col_name":"No Value",
        "currentId":"'.$debug.'"
    }';
   
}   
else{
    echo '{
        "col_name":"No Value",
        "currentId:"No Value"
    }';
} 

?>