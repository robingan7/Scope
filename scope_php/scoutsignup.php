<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $role=mysqli_real_escape_string($conn,$_POST['role']);
    $username = mysqli_real_escape_string($conn,$_POST['name']);;
    $teamnumber = mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $password = mysqli_real_escape_string($conn,$_POST['password']);
    $passwordRepeat = mysqli_real_escape_string($conn,$_POST['passwordc']);
    $check = $_POST['check'];
    $_SESSION['user'] = 'admin';
    
     $sql2="SELECT * FROM manager_info WHERE teamnumber='$teamnumber';";
    $result2=mysqli_query($conn, $sql2);

    $numOfmanager=mysqli_num_rows($result2);

  if ($username=="" || $password=="" || $passwordRepeat=="" || $role=="Choose...") {
    echo'
{
  "success": false,
  "message": "Please Fill in all the field"
}
  ';
    exit();
  }
  
  else if ($check==false) {
       echo'
{
  "success": false,
  "message": "Please check the checkbox"
}
  ';
    exit();
  }
  
  else if ($password != $passwordRepeat) {
      echo'
{
  "success": false,
  "message": "Two passwords are not the same"
}
  ';
    exit();
  }
  else if($numOfmanager>0){
     echo'
{
  "success": false,
  "message": "There\'s already a manager on this team"
}
  ';
  }
  else {
    //$password=password_hash($password,PASSWORD_BCRYPT);
    if($role=="scout"){
    $sql2="SELECT * FROM scout_info WHERE teamnumber='$teamnumber' and name='$username';";
    $result2=mysqli_query($conn, $sql2);

    if(mysqli_num_rows($result2)==0){
      $sql3="INSERT INTO `scout_info`(`teamnumber`,`name`,`password2`) VALUES ('$teamnumber','$username','$password');";
      $insert=mysqli_query($conn,$sql3);
       echo'
{
  "success": true,
  "message": "You\'re all set to login"
}
  ';
    }
    else{
        echo'
{
  "success": false,
  "message": "Account is already taken, please log in"
}
  ';
    }
}
else{
   $sql2="SELECT * FROM manager_info WHERE teamnumber='$teamnumber' and name='$username';";
    $result2=mysqli_query($conn, $sql2);

    if(mysqli_num_rows($result2)==0){
      $sql3="INSERT INTO `manager_info`(`teamnumber`,`name`,`password2`) VALUES ('$teamnumber','$username','$password');";
      $insert=mysqli_query($conn,$sql3);
       echo'
{
  "success": true,
  "message": "You\'re all set to login"
}
  ';
    }
    else{
        echo'
{
  "success": false,
  "message": "Account is already taken, please log in"
}
  ';
    }
}
} 
}
else {
  echo'
{
  "success": false,
  "message": "e field"
}
  ';
}

?>
