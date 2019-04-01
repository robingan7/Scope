<?php
session_start();
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
  $username = $_POST['name'];
  $password = $_POST['password'];
  if($username == '3' && $password == '3') {
    $_SESSION['user'] = 'admin';
    ?>
{
  "success": true,
  "secret": "This is the secret no one knows but the admin"
}
    <?php
  } else {
    ?>
{
  "success": false,
  "message": "Invalid credentials"
}
    <?php
  }
} else {
  //var_dump($_POST)
  ?>
{
  "success": false,
  "message": "Only POST access accepted"
}
  <?php
}
?>