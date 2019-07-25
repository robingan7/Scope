<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $role=mysqli_real_escape_string($conn,$_POST['role']);
    $username = mysqli_real_escape_string($conn,$_POST['name']);;
    $teamnumber = mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $password = mysqli_real_escape_string($conn,$_POST['password']);

    $_SESSION['user'] = 'admin';
    
  if ($username=="" || $password=="" || $role=="Choose...") {
    echo'
{
  "success": false,
  "message": "Please Fill in all the field"
}
  ';
    exit();
  }
  
  else {
    if($role=="scout"){
    $sql2="SELECT * FROM scout_info WHERE teamnumber='$teamnumber' and name='$username';";
    $result2=mysqli_query($conn, $sql2);
    
    if(mysqli_num_rows($result2)!=0){
      $row = mysqli_fetch_assoc($result2);
      if(password_verify($password, $row['password2']) || $password==$row['password2']){
        session_start();
        $_SESSION['current_user']=$row['name'];
         echo'
{
  "success": true,
  "message": "You\'re good",
  "name": "'.$row['name'].'",
  "match_scouted": '.$row['match_scouted'].',
   "teamnumber": '.$row['teamnumber'].',
    "role": "'.$role.'"
}
  ';
      }
      else{
        echo'
{
  "success": false,
  "message": "Wrong password"
}
  ';
      }
    }
    else{
        echo'
{
  "success": false,
  "message": "Account is not created, please sign up"
}
  ';
    }
}
else{
   $sql2="SELECT * FROM manager_info WHERE teamnumber='$teamnumber' and name='$username';";
    $result2=mysqli_query($conn, $sql2);
    
    if(mysqli_num_rows($result2)!=0){
      $row = mysqli_fetch_assoc($result2);
      if(password_verify($password, $row['password2']) || $password==$row['password2']){
        session_start();
        $_SESSION['current_user']=$row['name'];
        echo'
{
  "success": true,
  "message": "You\'re good",
  "name": "'.$row['name'].'",
  "match_scouted": '.$row['match_scouted'].',
   "teamnumber": '.$row['teamnumber'].',
    "role": "'.$role.'"
}
  ';}
      else{
        echo'
{
  "success": false,
  "message": "Wrong password"
}
  ';
      }
    }
    else{
        echo'
{
  "success": false,
  "message": "Account is not created, please sign up"
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
