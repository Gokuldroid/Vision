<?php
require_once 'includes/config.php';
$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
                
if ($conn->connect_error) { 
    die("Connection failed: " . $conn->connect_error);
} 

$binds=$conn->prepare("SELECT * FROM aboutus WHERE 1");
$binds->execute();
$updates;
$result=$binds->get_result();

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$updates[]=$row;
	}
	echo json_encode($updates);
}

?>