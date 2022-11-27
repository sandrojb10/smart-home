<?php 
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username)
	&& isset($data->usersenha) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->usersenha))
	){
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));
	$usersenha = mysqli_real_escape_string($db_conn, trim($data->usersenha));

	$add = mysqli_query($db_conn,"insert into user (nome,senha) values('$username','$usersenha')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);
		echo json_encode(["success"=>true,"insertid"=>$last_id]);
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