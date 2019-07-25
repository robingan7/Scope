<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $role=mysqli_real_escape_string($conn,$_POST['role']);
    $task=mysqli_real_escape_string($conn,$_POST['task_']);
    $manager_name=mysqli_real_escape_string($conn,$_POST['manager_name']);

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
        $old_task=$rows['tasks'];
        $id=$rows['id'];

        if(strlen($old_task)>0){
            if(!in_array($task,explode("*",$old_task))){
                $old_task.="*".$task;
            }else{
                echo '{
                 "m":"Match Already Exist"
                }';
                die();
            }
        }else{
            $old_task=$task;
        }

        $sql="UPDATE `$table` SET `tasks`='$old_task' WHERE id='$id';";
        $updatemanager=mysqli_query($conn,$sql);

        echo '{
        "m":"'.$old_task.'"
    }';
    }
}
    
else{
    echo '{
        "m":"No Value"
    }';
} 
?>