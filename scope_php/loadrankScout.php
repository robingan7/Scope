<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {

    $debug="";
$scout_team = mysqli_real_escape_string($conn, $_POST["team"]);
$col_index='[';

$col_index.='{"headerName": "Name", "field": "Name", "sortable": true, "width":120,"pinned": "left","rowHeight":200,
      "cellRenderer": "agGroupCellRenderer"},
      {"headerName": "Total", "field": "Total", "sortable": true, "width":105},
      {"headerName": "Pit", "field": "Pit", "sortable": true, "width":105},
      {"headerName": "Match", "field": "Match", "sortable": true, "width":105}';

$col_index.='
        ]';
$i2=0;

$outputarray='[';

$query = "SELECT `name` FROM scout_info WHERE teamnumber='$scout_team';";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0)
{
 while($rows = mysqli_fetch_array($result))
 {
    $name_=$rows['name'];

    $pit = "SELECT * FROM teams WHERE scout_name='$name_';";
    $resultPit = mysqli_query($conn, $pit);
    $pit_=mysqli_num_rows($resultPit);

    $match = "SELECT * FROM matchperformance WHERE scout_name='$name_';";
    $resultMatch = mysqli_query($conn, $match);
    $match_=mysqli_num_rows($resultMatch);

    $total_ = $match_+ $pit_;

    $outputarray.='{"Name":"'.$name_.'", "Total":'.$total_.',"Pit":'.$pit_.',"Match":'.$match_.'},';
 }

 $outputarray = substr_replace($outputarray, "", -1);
 $outputarray.="]";

 echo '{
        "col_index":'.$col_index.',
        "output":'.$outputarray.'
    }';
}
else
{
 echo '{
        "col_name":"No Value",
        "currentId":"No Value"
    }';
}
}else{
    echo '{
        "col_name":"No Value",
        "currentId":"connection"
    }';
}
?>