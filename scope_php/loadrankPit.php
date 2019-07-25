<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {

    $outputarray="[";
    $test="jjj";
    $scout_team =  mysqli_escape_string($conn,$_POST["team"]);
    $team_list = $_POST["pit_list"];
    //$currentOption = $_POST["currentOption"];
    //$currentOptionInner=$_POST["currentOptionInner"];

    $currentOption=["scout_name", "weight2","height2","sensor","autotype",
    "autolvl","autochoice","cargolevel","hatchlevel","speed","cargopickupspeed",
    "hatchpickupspeed","climbability","driver","question","answer","notes","date2"];

    $currentOptionInner=["Scout Name", "Weight","Height","Sensor","Auto Type",
    "Start Level","Auto Choice","Cargo Level","Hatch Level","Speed","Cargo Pickup Speed",
    "Hatch Pickup Speed","Climb Ability","Driver Years","Question","Answer","Notes","Date"];

    for ($i = 0; $i < count($team_list); ++$i){
        $temAA = mysqli_real_escape_string($conn,$team_list[$i]);
        $team_list[$i] = $temAA;
    } 

    for ($i = 0; $i < count($currentOption); ++$i){
        $temAA = mysqli_real_escape_string($conn,$currentOption[$i]);
        $currentOption[$i] = $temAA;
    } 

    for ($i = 0; $i < count($currentOptionInner); ++$i){
        $temAA = mysqli_real_escape_string($conn,$currentOptionInner[$i]);
        $currentOptionInner[$i] = $temAA;
    } 

    $output="";
    $col_index='[';
    //$query = "SELECT * FROM teams WHERE scout_team = '$scout_team' AND teamnumber = '$teamnumber[$j]' ORDER BY `teams`.";

    $col_index.='{"headerName": "Team#", "field": "Team_Number", "sortable": true, "width":70,"pinned": "left","editable":true,"cellEditor": "agLargeTextCellEditor"},';
    $col_index.='{"headerName": "Scout", "field": "scout_name", "sortable": true, "width":70,"pinned": "left","editable":true,"cellEditor": "agLargeTextCellEditor"},';    
    for ($i = 1; $i < count($currentOption); ++$i) {
        if($i==count($currentOption)-1){
            //$query=$query.$currentOption[$i]." DESC;";
            $col_index.='{"headerName": "'.$currentOptionInner[$i].'", "field":"'.$currentOption[$i].'","sortable": false, "width":100,"editable":true,"cellEditor": "agLargeTextCellEditor"}';
        }
        else{
        // $query=$query.$currentOption[$i]." DESC, ";
            $col_index.='{"headerName": "'.$currentOptionInner[$i].'", "field":"'.$currentOption[$i].'", "sortable": false, "width":100 ,"editable":true,"cellEditor": "agLargeTextCellEditor"},';
        }
    }

    $col_index.='
            ]';


    $output='';

    for ($j = 0; $j < count($team_list); $j++) {   
        $tem_teamL=$team_list[$j];
        $query = "SELECT * FROM teams WHERE scout_team = '$scout_team' AND teamnumber = '$tem_teamL';";         
        $result = mysqli_query($conn, $query);
        $outarraypart="";        
        
        if(mysqli_num_rows($result) > 0){
            $outputarray.=$output;
            while($rows = mysqli_fetch_array($result))
            {
                $output.= '
                {';
                
                $output .= '
                    "Team_Number":"'.(integer)$rows['teamnumber'].'",';
                for ($i = 0; $i < count($currentOption); ++$i) {
                    
                    if($i!=count($currentOption)-1){
                        //$currentOptionInner[$i]=str_replace(" ","_",$currentOptionInner[$i]);
                        if($currentOption[$i] == 'weight2'){
                            $output .= '
                            "'.$currentOption[$i].'":"'.$rows[$currentOption[$i]]." ".$rows['weightunit'].'",';
                        }else if($currentOption[$i] == 'height2'){
                            $output .= '
                            "'.$currentOption[$i].'":"'.$rows[$currentOption[$i]]." ".$rows['heightunit'].'",';
                        }else{
                            $output .= '
                            "'.$currentOption[$i].'":"'.$rows[$currentOption[$i]].'",';
                        }
                        
                    }
                    else{
                        //$currentOptionInner[$i]=str_replace(" ","_",$currentOptionInner[$i]);
                        if($currentOption[$i] == 'weight2'){
                            $output .= '
                            "'.$currentOption[$i].'":"'.$rows[$currentOption[$i]]." ".$rows['weightunit'].'"';
                        }else if($currentOption[$i] == 'height2'){
                            $output .= '
                            "'.$currentOption[$i].'":"'.$rows[$currentOption[$i]]." ".$rows['heightunit'].'"';
                        }else{
                            $output .= '
                            "'.$currentOption[$i].'":"'.$rows[$currentOption[$i]].'"';
                        }
                    }
                }
                $output.='
                },';
                
            }
            if($j == count($team_list)-1){
                $output=substr($output, 0, strlen($output)-1);
            }

            $outputarray.= $output;
            $output='';
        }
    }
    $outputarray.="
    ]";

    echo '{
        "col_index":'.$col_index.',
        "output":'.$outputarray.'
    }';

}else{
    echo '{
        "col_name":"No Value",
        "currentId":"connection"
    }';
}
?>