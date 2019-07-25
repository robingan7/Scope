<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {

$outputarray="";
$test="jjj";
$scout_team = mysqli_real_escape_string($conn, $_POST["team"]);
$region = mysqli_real_escape_string($conn, $_POST["region"]);
$currentOption = $_POST["currentOption"];
$currentOptionInner = $_POST["currentOptionInner"];

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
$query = "SELECT * FROM team_total WHERE scout_team='$scout_team' AND region='$region' ORDER BY `team_total`.";

$col_index.='{"headerName": "Team Number", "field": "Team_Number", "sortable": true, "width":130,"pinned": "left","rowHeight":200,
        "headerCheckboxSelection": true,
      "cellRenderer": "agGroupCellRenderer",
      "cellRendererParams": { "checkbox": true }},';
for ($i = 1; $i < count($currentOption); ++$i) {
    if($i==count($currentOption)-1){
        $query=$query.$currentOption[$i]." DESC;";
        $col_index.='{"headerName": "'.$currentOptionInner[$i].'", "field":"'.str_replace(" ","_",$currentOptionInner[$i]).'","sortable": true, "width":115}';
    }
    else{
        $query=$query.$currentOption[$i]." DESC, ";
        $col_index.='{"headerName": "'.$currentOptionInner[$i].'", "field":"'.str_replace(" ","_",$currentOptionInner[$i]).'", "sortable": true, "width":115 },';
    }
}

$col_index.='
        ]';
$result = mysqli_query($conn, $query);
$i2=0;

$output='[
            ';
if(mysqli_num_rows($result) > 0)
{
  $count=mysqli_num_rows($result);
   $outputarray.=$output;
 while($rows = mysqli_fetch_array($result))
 {
     $output = '
     {';
     
    $output .= '
        "Team_Number":"'.(integer)$rows['teamnumber'].'",';
    for ($i = 0; $i < count($currentOption); ++$i) {
        
        if($i!=count($currentOption)-1){
            $currentOptionInner[$i]=str_replace(" ","_",$currentOptionInner[$i]);
            $output .= '
            "'.$currentOptionInner[$i].'":'.$rows[$currentOption[$i]].',';
        }
        else{
            $currentOptionInner[$i]=str_replace(" ","_",$currentOptionInner[$i]);
            $output .= '
            "'.$currentOptionInner[$i].'":'.$rows[$currentOption[$i]].'';
        }
    }
    $output.='
    },';

    $i2++;
    if($i2>=$count){
        $output=substr($output, 0, strlen($output)-1);
    }
    $outputarray.=$output;
 }
 
 $outputarray.="
 ]";
 echo '{
        "col_index":'.$col_index.',
        "output":'.$outputarray.'
    }';
    $outputarray="";
}
else
{
 echo '{
        "col_name":"No Value",
        "currentId":"'.$currentOption[1].'"
    }';
}
}else{
    echo '{
        "col_name":"No Value",
        "currentId":"connection"
    }';
}
?>