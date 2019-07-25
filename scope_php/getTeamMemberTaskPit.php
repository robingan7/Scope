<?php
include_once('database.php');
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $teamnumber=mysqli_real_escape_string($conn,$_POST['teamnumber']);
    $name=mysqli_real_escape_string($conn,$_POST['name']);
    
    $list="{";

    $sql3="SELECT * FROM `scout_info` WHERE `teamnumber`='$teamnumber';";
    $result=mysqli_query($conn, $sql3);

    if(mysqli_prepare($conn,$sql3)){
        while($rows = mysqli_fetch_array($result)){
            if($rows['tasks_pit']!=null && $rows['tasks_pit']!=""){
            $list.='"'.$rows['name'].'":[';

            $tem_match=explode("*",$rows['tasks_pit']);

            for($i=0;$i<sizeOf($tem_match);$i++){
                if($i==sizeOf($tem_match)-1){
                $list.='{
                    "team_number":"'.$tem_match[$i].'"
                        }';
                    }else{
                       $list.='{
                    "team_number":"'.$tem_match[$i].'"
                        },';
                    }
            }
            $list.="],";
        }else{
            $list.='"'.$rows['name'].'":[],';
        }
    }

    $sql3="SELECT * FROM `manager_info` WHERE `teamnumber`='$teamnumber' AND `name`='$name';";
    $result=mysqli_query($conn, $sql3);
    while($rows = mysqli_fetch_array($result)){
            if($rows['tasks_pit']!=null && $rows['tasks_pit']!=""){
            $list.='"'.$rows['name'].'":[';

            $tem_match=explode("*",$rows['tasks_pit']);

            for($i=0;$i<sizeOf($tem_match);$i++){
               if($i==sizeOf($tem_match)-1){
                $list.='{
                    "team_number":"'.$tem_match[$i].'"
                        }';
                    }else{
                       $list.='{
                    "team_number":"'.$tem_match[$i].'"
                        },';
                    }
            }
            $list.="],";
        }else{
            $list.='"'.$rows['name'].'":[],';
        }
    }

    $list=substr($list, 0, strlen($list)-1);
        $list.="}";

        echo '{
        "m":'.$list.'
        }';
    }
}
    
else{
    echo '{
        "m":"No Value"
    }';
} 
?>