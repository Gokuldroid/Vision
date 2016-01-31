<?php
session_start();
require_once('includes/config.php'); 

$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);                
if ($conn->connect_error) { 
	die("Connection failed: " . $conn->connect_error);
}


if($_GET['q']=='login'){
	
	$_POST=json_decode(file_get_contents('php://input'),TRUE);
	$username=mysql_real_escape_string($_POST['username']);
	$password=sha1(mysql_real_escape_string($_POST['password']));
	$binds=$conn->prepare("SELECT * FROM cmsusers WHERE `username`=? AND `password`=? AND `powerlevel` in (1,2)");
	$binds->bind_param('ss',$username,$password);
	$binds->execute();
	$result=$binds->get_result();

	if ($result->num_rows == 1) {
		while($row = $result->fetch_assoc()) {
			$SESSION['powerlevel']=$row['powerlevel'];
			$SESSION['cmsuser']=$row['username'];
		}
		echo "login success";
	}else{
		echo "Contact web admin for authorization.";
		$SESSION['cmsuser']=null;
	}

}elseif ($_GET['q']=='signup') {

	$_POST=json_decode(file_get_contents('php://input'),TRUE);
	
	$id=null;
	$username=mysql_real_escape_string($_POST['username']);
	$password=sha1(mysql_real_escape_string($_POST['password']));
	
	$binds=$conn->prepare("INSERT INTO cmsusers VALUES (?,?,?,0)");
	$binds->bind_param('dss',$id,$username,$password);
	
	if($binds->execute()===TRUE)
	{
		echo "Signup successful.Contact web admin for access";
	}
	else
	{
		echo "error occured";
	}

}else{
	echo "Error occured";
}
?>