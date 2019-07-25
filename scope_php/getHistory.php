<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    
    $scout_name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);

    $resul="";
    $resul2="";
    $tem="";
    $temmatch="";
    $datelist = array();
    $matchlist=array();
    $temmatchele="";
    $bs="";
    $sql2="SELECT * FROM matchperformance WHERE scout_team='$scout_team' AND scout_name='$scout_name' ORDER BY `matchperformance`.`date2` ASC;";
    $result2=mysqli_query($conn, $sql2);
    while($rows= mysqli_fetch_assoc($result2)){
        if($rows['date2']!=$tem){
            array_push($datelist,$rows['date2']);
            $tem=$rows['date2'];

            $sql3="SELECT * FROM matchperformance WHERE scout_team='$scout_team' AND scout_name='$scout_name' AND date2='$tem' ORDER BY `matchperformance`.`date2` ASC;";
            $result3=mysqli_query($conn, $sql3);
            while($rows2= mysqli_fetch_assoc($result3)){
                $temmatchele=$temmatchele.(String)$rows2['region']."-".(String)$rows2['matchnumber']."-".(String)$rows2['teamnumber']."/";
            }
            array_push($matchlist,substr($temmatchele, 0, strlen($temmatchele)-1));
            $temmatchele="";
        }
    }
    
    foreach(array_reverse($datelist) as $date){
        $resul=$resul.$date."/";
        $bs=$bs.'
            "a'.join("",explode('-',$date)).'":false,
        ';
    }
        
    foreach(array_reverse($matchlist) as $match){
        $resul2=$resul2.$match."*";
    }
    echo '{
        "col_name":"'.substr($resul2, 0, strlen($resul2)-1).'",
        "currentId":"'.substr($resul, 0, strlen($resul)-1).'",
        "bs":[
            {
            '.substr($bs, 0, strlen($bs)-10).'
            }
        ]
            
    }';
}   
else{
    echo '{
        "col_name":"No Value",
        "currentId":"No Value"
    }';
} 

?>