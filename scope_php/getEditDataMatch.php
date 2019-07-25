<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $scout_name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $region=mysqli_real_escape_string($conn,$_POST['region']);
    $matchnumber=mysqli_real_escape_string($conn,$_POST['matchnumber']);
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);

    $element=["id","region","matchnumber","teamnumber","alliance","exitplatform","autohatch","autocargo",
    "cargolvl1","cargolvl2","cargolvl3","hatchlvl1","hatchlvl2","hatchlvl3","cargoship","hatchship","defenseblock", 
    "defensedrop", "hatchdrop", "cargodrop","climbpoint","fitness","question","answer","notes"];
        $sql3="SELECT * FROM `matchperformance` WHERE teamnumber='$teamnumber' AND scout_name='$scout_name' AND scout_team='$scout_team' AND matchnumber='$matchnumber' AND region='$region';";
        $result=mysqli_query($conn, $sql3);
        $row = mysqli_fetch_assoc($result);
        $result="[{";
        for ($i = 0; $i < count($element); ++$i) {
            if($i!=count($element)-1){
            $result.='"'.$element[$i].'":"'.$row[$element[$i]].'",
            ';
            }else{
                $result.='"'.$element[$i].'":"'.$row[$element[$i]].'"
                ';
            }
        }
         $result.="}]";
        echo '
      {
         "m":'.$result.'
      }';
   
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>