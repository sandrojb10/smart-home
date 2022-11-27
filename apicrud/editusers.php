<?php 
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username)
	&& isset($data->usersenha) 
	&& isset($data->userids) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->usersenha))
	&& !empty(trim($data->userids))
	){
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));
	$usersenha = mysqli_real_escape_string($db_conn, trim($data->usersenha));
	$userids = mysqli_real_escape_string($db_conn, trim($data->userids));

  $add = mysqli_query($db_conn,"update user set nome ='$username', senha ='$usersenha'where user_id='$userids'");

	if($add){
		echo json_encode(["success"=>true]);
		return;
    }else{
        echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} else{
    echo json_encode(["success"=>false,"msg"=>"Please fill all the required fields!"]);
	return;
}
?>