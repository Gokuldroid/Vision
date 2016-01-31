<?php
 require_once('includes/PushBots.class.php');

 $_POST=json_decode(file_get_contents('php://input'),TRUE);

function sendmessage($message){

$pb = new PushBots();
// Application ID
$appSecret = '01051c0a6ff7ce415584f3718c9c4cc7';
// Application Secret
$appID = '56a886bc177959da488b4567';
$pb->App($appID, $appSecret);
$customfields = array("PushBots"=>"true");
$pb->Payload($customfields);
// Notification Settings
$pb->Alert($message);
$pb->Platform(array("0","1"));
$pb->Badge("+2");

$pb->AliasData(1, "APA91bFpQyCCczXC6hz4RTxxxxx", "test");
// set Alias on the server
$pb->setAlias();

// Push it !
$pb->Push();
return null;
}


if(true){
	sendmessage($_POST['message']);
	echo "success";
}else{
	echo "You are not logged in";
}

?>