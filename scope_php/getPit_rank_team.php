<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $team=mysqli_real_escape_string($conn,$_POST['team']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);

    $debug="[";
    
    if($role=="M"){
        $sql3="SELECT `pit_rank_team` FROM `manager_info` WHERE teamnumber='$team' AND `name`='$name';";
    }else if($role=="S"){
        $sql3="SELECT `pit_rank_team` FROM `scout_info` WHERE teamnumber='$team' AND `name`='$name';";
    }
    $result=mysqli_query($conn,$sql3);

    if(mysqli_num_rows($result) == 1){
        $rows = mysqli_fetch_array($result);

        $list = explode("/",$rows["pit_rank_team"]);
        for ($i = 0; $i < count($list); ++$i){
            if($i == count($list)-1){
                $debug.='"'.$list[$i].'"]';
            }else{
                $debug.='"'.$list[$i].'",';
            }
        }
    }    
    echo '{
       "m":'.$debug.'
    }';
   
}   
else{
    echo '{
        "col_name":"No Value",
        "currentId:"No Value"
    }';
} 

?>