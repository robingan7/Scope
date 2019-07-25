<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $teamnumber = mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $currentRegion = mysqli_real_escape_string($conn,$_POST['currentRegion']);

    
    $updatethings=array(
    "totalcargo",
    "totalhatch" ,
    "cargolvl1" ,
    "cargolvl2" ,
    "cargolvl3" ,
    "hatchlvl1" ,
    "hatchlvl2" ,
    "hatchlvl3" ,
    "climbpoint" ,
    "cargoship" ,
    "hatchship" ,
    "totalautopoint",
    "autohatch" ,
    "autocargo",
    "defenseblock",
    "defensedrop",
    "hatchdrop",
    "cargodrop"
    );

    if(!($scout_team=="" or $teamnumber=="" or $currentRegion=="")){
      $sql2="SELECT * FROM `team_total` WHERE teamnumber='$teamnumber' AND scout_team='$scout_team' AND region='$currentRegion';";
      $result2=mysqli_query($conn, $sql2);
      $numberOftotal=mysqli_num_rows($result2);

      if($numberOftotal==0){
          $sql3="INSERT INTO `team_total`(`scout_team`,`teamnumber`,`region`) VALUES ('$scout_team','$teamnumber','$currentRegion');";
          $insert=mysqli_query($conn,$sql3);
      }

      $total=0;
      $sql="SELECT * FROM `matchperformance` WHERE teamnumber='$teamnumber' AND scout_team='$scout_team' AND region='$currentRegion';";
      $result=mysqli_query($conn, $sql);
      $numberOfMatch=mysqli_num_rows($result);
      if($numberOfMatch>0){
      //$row = mysqli_fetch_assoc($result);
        foreach($updatethings as $thing){
            while($rows= mysqli_fetch_assoc($result)){
                if($rows[$thing]!="" and $rows[$thing]!=null){
                      $total=$total+(Integer)$rows[$thing];
                }
                  
            }
            $average=number_format((float)$total/$numberOfMatch, 2);
            $averageCol=$thing.'A';
            $sql3="UPDATE team_total SET `$thing`='$total',`$averageCol`='$average' WHERE teamnumber='$teamnumber' AND scout_team='$scout_team' AND region='$currentRegion';";
            $updatetotal=mysqli_query($conn,$sql3);
            $sql="SELECT * FROM `matchperformance` WHERE teamnumber='$teamnumber' AND scout_team='$scout_team' AND region='$currentRegion';";
            $result=mysqli_query($conn, $sql);
            //$total++;
            $total=0;
        }
        echo'
        {
          "col_name": true,
          "currentId": "'.$total.'"
        }
          ';
      }else{
            echo'
            {
              "col_name": false,
              "currentId": "no match"
            }
              ';
          } 
    }else{
      echo'
      {
      "col_name": false,
      "currentId": "wrong value"
    }
      ';
  }
}
else {
  echo'
{
  "success": false,
  "message": "e field"
}
  ';
}

?>
