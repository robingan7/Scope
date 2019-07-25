<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $scout_region=mysqli_real_escape_string($conn,$_POST['scout_region']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $select=$_POST['select'];
    $notselect=$_POST['notselect'];

    for ($i = 0; $i < count($select); ++$i){
        $temAA = mysqli_real_escape_string($conn,$select[$i]);
        $select[$i] = $temAA;
    }
    
    for ($i = 0; $i < count($notselect); ++$i){
        $temAA = mysqli_real_escape_string($conn,$notselect[$i]);
        $notselect[$i] = $temAA;
    }

    $debug="";
    foreach($select as $selectedItem){
        $sql3="UPDATE `team_total` SET `isSelect`=1 WHERE teamnumber='$selectedItem' AND region='$scout_region' AND scout_team='$scout_team';";
        $updateselect=mysqli_query($conn,$sql3);
        
        $debug.=$selectedItem;
    }

    foreach($notselect as $unselectedItem){
        $sql3="UPDATE `team_total` SET `isSelect`=0 WHERE teamnumber='$unselectedItem' AND region='$scout_region' AND scout_team='$scout_team';";
        $updateselect=mysqli_query($conn,$sql3);
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