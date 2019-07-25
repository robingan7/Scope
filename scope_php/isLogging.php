<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
session_start();
if(isset($_SESSION['current_user'])) {
    echo '{"status": true}';
} else {
    echo '{"status": false}';
}
?>