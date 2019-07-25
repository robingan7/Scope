<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $scout_name=mysqli_real_escape_string($conn,$_POST['scout_name']);
    $scout_team=mysqli_real_escape_string($conn,$_POST['scout_team']);
    $title=mysqli_real_escape_string($conn,$_POST['title']);
    $image = $_POST['image'];

    $sql3="INSERT INTO `mediadata`( `scout_name`, `scout_team`, `teamnumber`,`title`,`image2`) VALUES ('$scout_name','$scout_team','$teamnumber','$title','$image');";
    $updateimage=mysqli_query($conn,$sql3);
    
    //$sql2="SELECT * FROM mediadata WHERE teamnumber='$teamnumber' AND scout_name='$scout_name' AND scout_team='$scout_team' AND title='$title' ;";
    $sql2="SELECT * FROM mediadata WHERE id='27';";
    $result2=mysqli_query($conn, $sql2);
    $row = mysqli_fetch_assoc($result2);
      echo '{
        "col_name":"Image",
        "currentId":"'.$row['image2'].'"
    }';
   
}   
else{
    echo '{
        "m":"No Value"
    }';
} 
?>