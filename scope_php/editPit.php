<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $pitform=$_POST['array'];
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    $result_pit="";
    for ($i = 0; $i < count($pitform); ++$i){
        $temAA = mysqli_real_escape_string($conn,$pitform[$i]);
        $pitform[$i] = $temAA;
    }

    for($i=0;$i<sizeof($pitform);$i++){
        if($i==sizeof($pitform)-1){
            $result_pit=$result_pit.$pitform[$i];
        }else{
            $result_pit=$result_pit.$pitform[$i].'/';
        }
    }
     $sql2="SELECT * FROM manager_info WHERE teamnumber='$teamnumber' and name='$name';";
    $result2=mysqli_query($conn, $sql2);
    
    if(mysqli_num_rows($result2)!=0){
        $sql3="UPDATE `manager_info` SET `pitform`='$result_pit' WHERE teamnumber='$teamnumber' AND name='$name';";
        $updatemanager=mysqli_query($conn,$sql3);
        $sql4="UPDATE `scout_info` SET `pitform`='$result_pit' WHERE teamnumber='$teamnumber';";
        $updateAllScout=mysqli_query($conn,$sql4);
        echo '
      {
         "m":"'.$result_pit.'"
      }';
    }else{
    echo '
      {
         "m":"Manager doesnt exist"
      }';
    }
    
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>