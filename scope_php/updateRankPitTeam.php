<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $team=mysqli_real_escape_string($conn,$_POST['team']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);

    $list=$_POST['list'];

    for ($i = 0; $i < count($list); ++$i){
        $temAA = mysqli_real_escape_string($conn,$list[$i]);
        $list[$i] = $temAA;
    }
    $debug="";
    
    $str = implode("/",$list);
    if($role=="M"){
        $sql3="UPDATE `manager_info` SET `pit_rank_team`='$str' WHERE teamnumber='$team' AND name='$name';";
    }else if($role=="S"){
        $sql3="UPDATE `scout_info` SET `pit_rank_team`='$str' WHERE teamnumber='$team' AND name='$name';";
    }
    $updateselect=mysqli_query($conn,$sql3);
        
    echo '{
       "m":"yes"
    }';
   
}   
else{
    echo '{
        "col_name":"No Value",
        "currentId:"No Value"
    }';
} 

?>