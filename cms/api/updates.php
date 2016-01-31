<?php
require_once('includes/config.php'); 

$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);                
if ($conn->connect_error) { 
	die("Connection failed: " . $conn->connect_error);
}


if(true){
	if($_GET['q']=='delete'){
		
		$_POST=json_decode(file_get_contents('php://input'),TRUE);
		$id=mysql_real_escape_string($_POST['id']);
		$binds=$conn->prepare("DELETE FROM updates WHERE `id`=?");
		$binds->bind_param('d',$id);
		
		if($binds->execute()===TRUE)
		{
			echo "update deleted.please refresh.";
		}
		else
		{
			echo "error occured.";
		}

	}elseif ($_GET['q']=='add') {

		$_POST=json_decode(file_get_contents('php://input'),TRUE);
		$id=null;
		$news=mysql_real_escape_string($_POST['news']);
		$binds=$conn->prepare("INSERT INTO updates VALUES (?,?)");
		$binds->bind_param('ds',$id,$news);
		
		if($binds->execute()===TRUE)
		{
			echo "update added";
		}
		else
		{
			echo "error occured";
		}

	}else{
		echo "Error occured";
	}
}else{
	echo "You are not logged in";
}
?>