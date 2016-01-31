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
		$binds=$conn->prepare("DELETE FROM aboutus WHERE `id`=?");
		$binds->bind_param('d',$id);
		
		if($binds->execute()===TRUE)
		{
			echo "Tab deleted.please refresh.";
		}
		else
		{
			echo "error occured.";
		}

	}elseif ($_GET['q']=='add') {

		$_POST=json_decode(file_get_contents('php://input'),TRUE);
		$id=null;
		$title=mysql_real_escape_string($_POST['title']);
		$content=mysql_real_escape_string($_POST['content']);
		$binds=$conn->prepare("INSERT INTO aboutus VALUES (?,?,?)");
		$binds->bind_param('dss',$id,$title,$content);
		
		if($binds->execute()===TRUE)
		{
			echo "New Tab added";
		}
		else
		{
			echo "error occured";
		}

	}else{
		echo "Error occured,Check query";
	}

}else{
	echo "You are not logged in";
}
?>