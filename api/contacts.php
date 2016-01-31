<?php
require_once 'includes/config.php';
$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
                
if ($conn->connect_error) { 
    die("Connection failed: " . $conn->connect_error);
} 

$binds=$conn->prepare("SELECT * FROM contacts WHERE 1");
$binds->execute();
$teams;
$result=$binds->get_result();

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$teams[]=$row['team'];
	}
	$teams=array_unique($teams);
}
$json;
foreach ($teams as $team ) {
	$binds=$conn->prepare("SELECT * FROM contacts WHERE `team`=?");
	$binds->bind_param('s',$team);
	$binds->execute();
	$result=$binds->get_result();
	$res=null;
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$temp=null;
			$temp['name']=$row['name'];
			$temp['phone']=$row['phone'];
			$temp['id']=$row['id'];
			$temp['avatar']="http://lorempixel.com/100/100";
			$res[]=$temp;
		}
	}
	$json[$team]=$res;

}

echo json_encode($json);

?>