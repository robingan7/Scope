<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $mem_name=mysqli_real_escape_string($conn,$_POST['mem_name']);
    $num=mysqli_real_escape_string($conn,$_POST['num']);

    $sql3="SELECT * FROM scout_info WHERE teamnumber='$teamnumber' AND name='$mem_name';";
    $result=mysqli_query($conn, $sql3);

    if(mysqli_prepare($conn,$sql3)){
        if(mysqli_num_rows($result)>0){
            $row=mysqli_fetch_array($result);
            $old_tasks=$row['tasks'];
            $id=$row['id'];
            $raw_tasks=explode("*",$old_tasks);

            $raw_tasks[(Integer)$num]="";

            array_splice($raw_tasks,(Integer)$num,1);
            
            $new_=implode("*",$raw_tasks);

            $sql="UPDATE `scout_info` SET `tasks`='$new_' WHERE id='$id';";
            $resl=mysqli_query($conn,$sql);

            echo '{
                "m":"'.$new_.'"
            }';
        }else{
            $sql3="SELECT * FROM manager_info WHERE teamnumber='$teamnumber' AND name='$name';";
            $result=mysqli_query($conn, $sql3);
            if(mysqli_num_rows($result)>0){
                $row=mysqli_fetch_array($result);
                $old_tasks=$row['tasks'];
                $id=$row['id'];
                $raw_tasks=explode("*",$old_tasks);

                $raw_tasks[(Integer)$num]="";

                array_splice($raw_tasks,(Integer)$num,1);
            
                $new_=implode("*",$raw_tasks);

                $sql="UPDATE `manager_info` SET `tasks`='$new_' WHERE id='$id';";
                $resl=mysqli_query($conn,$sql);

                echo '{
                    "m":"'.$new_.'"
                }';
            }
        }
    }else{
        echo '{
                "m":"connection error"
            }';
    }
}
    
else{
    echo '{
        "m":"No Value"
    }';
} 
?>