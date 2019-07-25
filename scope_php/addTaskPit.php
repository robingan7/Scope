<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);
    $task=$_POST['task_'];
    $manager_name=mysqli_real_escape_string($conn,$_POST['manager_name']);

    for ($i = 0; $i < count($task); ++$i){
        $temAA = mysqli_real_escape_string($conn,$task[$i]);
        $task[$i] = $temAA;
    }
    $table="";
    $old_task="";
    $id="";

    if($name==$manager_name){
        $table="manager_info";
    }else{
        $table="scout_info";
    }

    $sql3="SELECT * FROM `$table` WHERE `teamnumber`='$teamnumber' AND `name`='$name';";
    $result=mysqli_query($conn, $sql3);

    if(mysqli_prepare($conn,$sql3)){
        $rows = mysqli_fetch_array($result);
        $old_task=$rows['tasks_pit'];
        $id=$rows['id'];
        if(strlen($old_task)>0){
            foreach($task as $tt){   
                if(!in_array($tt, explode("*",$old_task))){
                    $old_task.="*".$tt;
                }
            }
        }else{
            $old_task=implode("*",$task);
        }

        $sql="UPDATE `$table` SET `tasks_pit`='$old_task' WHERE id='$id';";
        $updatemanager=mysqli_query($conn,$sql);

        echo '{
        "m":"'.implode("*",$task).'"
        }';
    }
}
    
else{
    echo '{
        "m":"No Value"
    }';
} 
?>