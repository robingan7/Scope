<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {

$outputarray="";
$test="jjj";
$scout_team = mysqli_real_escape_string($conn, $_POST["scout_team"]);
$region = mysqli_real_escape_string($conn, $_POST["region"]);
$currentOption = $_POST['option'];
$currentOptionInner=$_POST['optioninner'];

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
$query = "SELECT * FROM team_total WHERE scout_team='$scout_team' AND region='$region' AND isSelect=1 ORDER BY `team_total`.`rank` ASC,";

//$col_index.='{"headerName": "#", "field": "#", "sortable": false, "filter": false,"width":130,"pinned": "left","rowHeight":200},';
$col_index.='{"headerName": "Team Number", "field": "Team_Number", "sortable": true, "width":130,"pinned": "left",
        "headerCheckboxSelection": true,
        "rowDrag": true,
      "cellRenderer": "agGroupCellRenderer",
      "cellRendererParams": { "checkbox": true }},
      ';
//$currentOption = array_reverse($currentOption);
//$currentOptionInner = array_reverse($currentOptionInner);
for ($i = 1; $i < count($currentOption); ++$i) {
    //$currentOptionInner[$i]=str_replace(" ","_",$currentOptionInner[$i]);
    if($i==count($currentOption)-1){
        $query=$query.$currentOption[$i]." DESC;";
        $col_index.='{"headerName": "'.$currentOptionInner[$i].'", "field":"'.str_replace(" ","_",$currentOptionInner[$i]).'","sortable": true, "width":110}';
    }
    else{
        $query=$query.$currentOption[$i]." DESC, ";
        $col_index.='{"headerName": "'.$currentOptionInner[$i].'", "field":"'.str_replace(" ","_",$currentOptionInner[$i]).'", "sortable": true, "width":110 },';
    }
}


$col_index.='
        ]';
$result = mysqli_query($conn, $query);
$i2=0;
//$query="";
$output='[
            ';

if($result!=false){            
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
        "currentId":"'.$query.'"
    }';
}
}else{
    echo '{
        "col_name":"No Value",
        "currentId":"connection"
    }';
}
}else{
    echo '{
        "col_name":"No Value",
        "currentId":"connection"
    }';
}
?>