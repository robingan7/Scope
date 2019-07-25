<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $col_name=mysqli_real_escape_string($conn,$_POST['id']);
    $value=mysqli_real_escape_string($conn,$_POST['value']);
    $scout_name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);

    $currentMatch=mysqli_real_escape_string($conn,$_POST['currentMatch']);

    $currentMatchNumber=mysqli_real_escape_string($conn,$_POST['currentMatchNumber']);
    $currentRegion=mysqli_real_escape_string($conn,$_POST['currentRegion']);
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);

    $sql2="SELECT * FROM matchperformance WHERE scout_team='$scout_team' AND scout_name='$scout_name' AND matchnumber='$currentMatchNumber' AND region='$currentRegion' AND teamnumber='$teamnumber';";
    $result2=mysqli_query($conn, $sql2);
    
    if($currentMatchNumber != 0 and $currentRegion != "none" and $teamnumber != "none"){
    if($currentMatch=="none"){
    if(mysqli_num_rows($result2)!=0){
        echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"Match Already Exist, go to history page to edit"
      }';
    }else{
        if($col_name=="thethree"){
            $date = date('Y-m-d');
            $sql3="INSERT INTO `matchperformance`( `scout_name`, `scout_team`, `region`,`matchnumber`,`teamnumber`,`date2`) VALUES ('$scout_name','$scout_team','$currentRegion','$currentMatchNumber','$teamnumber','$date');";
            $updatepit=mysqli_query($conn,$sql3);
            $sql2="SELECT * FROM matchperformance WHERE scout_team='$scout_team' AND scout_name='$scout_name' AND region='$currentRegion' AND matchnumber='$currentMatchNumber' AND teamnumber='$teamnumber';";
            $result2=mysqli_query($conn, $sql2);
            $row = mysqli_fetch_assoc($result2);
            echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"'.$row['id'].'"
      }';
        $sql2="SELECT * FROM teams WHERE scout_team='$scout_team' AND scout_name='$scout_name' AND teamnumber='$teamnumber';";
        $result2=mysqli_query($conn, $sql2);

        if(mysqli_num_rows($result2)==0){
            $date = date('Y-m-d');
            $sql3="INSERT INTO `teams`( `scout_name`, `scout_team`, `teamnumber`,`date2`) VALUES ('$scout_name','$scout_team','$teamnumber','$date');";
            $result3=mysqli_query($conn, $sql3);
        }
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
     if($col_name=="thethree"){
         if(mysqli_num_rows($result2)==0){
         $date = date('Y-m-d');
            $sql3="INSERT INTO `matchperformance`( `scout_name`, `scout_team`, `region`,`matchnumber`,`teamnumber`,`date2`) VALUES ('$scout_name','$scout_team','$currentRegion','$currentMatchNumber','$teamnumber','$date');";
            $updatepit=mysqli_query($conn,$sql3);
            $sql2="SELECT * FROM matchperformance WHERE scout_team='$scout_team' AND scout_name='$scout_name' AND region='$currentRegion' AND matchnumber='$currentMatchNumber' AND teamnumber='$teamnumber';";
            $result2=mysqli_query($conn, $sql2);
            $row = mysqli_fetch_assoc($result2);
            echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"'.$row['id'].'"
      }';
        $sql2="SELECT * FROM teams WHERE scout_team='$scout_team' AND scout_name='$scout_name' AND teamnumber='$teamnumber';";
        $result2=mysqli_query($conn, $sql2);

        if(mysqli_num_rows($result2)==0){
            $date = date('Y-m-d');
            $sql3="INSERT INTO `teams`( `scout_name`, `scout_team`, `teamnumber`,`date2`) VALUES ('$scout_name','$scout_team','$teamnumber','$date');";
            $result3=mysqli_query($conn, $sql3);
        }
    }else{
         echo '
      {
         "col_name":"'.$col_name.'",
         "currentId":"Match Already Exist, go to history page to edit"
      }';
    }
    }
        else{
             $sql3="UPDATE `matchperformance` SET `$col_name`='$value' WHERE id='$currentMatch';";
            $updatepit=mysqli_query($conn,$sql3);

            $sql2="SELECT * FROM matchperformance WHERE id='$currentMatch';";
            $result2=mysqli_query($conn, $sql2);
            $row = mysqli_fetch_assoc($result2);
            $totalhatch=(Integer)$row['hatchlvl1']+(Integer)$row['hatchlvl2']+(Integer)$row['hatchlvl3']+(Integer)$row['hatchship'];
            $totalcargo=(Integer)$row['cargolvl1']+(Integer)$row['cargolvl2']+(Integer)$row['cargolvl3']+(Integer)$row['cargoship'];
            $totalauto=(Integer)$row['autohatch']+(Integer)$row['autocargo'];

            $date = date('Y-m-d');
            $sql3="UPDATE `matchperformance` SET `totalautopoint`='$totalauto' ,`totalcargo`='$totalcargo',`totalhatch`='$totalhatch',`date2`='$date' WHERE id='$currentMatch';";
            $updatetotal=mysqli_query($conn,$sql3);
            echo '
            {
                "col_name":"'.$col_name.'",
                "currentId":"'.$row['id'].'"
            }';
        }
   
}
    }
    else{
        echo '
            {
                "col_name":"'.$col_name.'",
                "currentId":"Fill in all the part"
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