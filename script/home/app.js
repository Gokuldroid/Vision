var app=angular.module("home", ['angular-loading-bar','ngSanitize', 'ngAnimate', 'ngRoute', 'ngMessages','ngCookies']);

app.config(function ($routeProvider) {
	$routeProvider.when('/home',{
		templateUrl:'partials/home.html',
		controller:'homeController'
	}).when('/events',{
		templateUrl:'partials/events.html',
		controller:'eventsController'
	}).when('/workshops',{
		templateUrl:'partials/workshops.html',
		controller:'workshopController'
	}).when('/hospitality',{
		templateUrl:'partials/hospitality.html',
		controller:'hospitalityController'
	}).when('/contacts',{
		templateUrl:'partials/contacts.html',
		controller:'contactsController'
	}).when('/aboutus',{
		templateUrl:'partials/aboutus.html',
		controller:'aboutusController'
	}).when('/login',{
		templateUrl:'partials/login.html',
		controller:'loginController'
	}).otherwise({redirectTo:'/home'});
});

app.controller('homeController',function ($scope,$http){

});
app.controller('eventsController',function ($scope,$http){

});
app.controller('workshopController',function ($scope,$http){

});
app.controller('contactsController',function ($scope,$http){
	$scope.contacts=[];
	$http.get("../api/contacts.php").success(function (response) {
        $scope.contacts = response;
    });
});

app.controller('hospitalityController',function ($scope,$http){

});

app.controller('aboutusController',function ($scope,$http){
	$scope.tabs=[];
	$http.get("../api/aboutus.json").success(function (response) {
        $scope.tabs = response;
    });
});
app.controller('mainController',function ($scope,$http){

});
app.controller('loginController',function ($scope,$http,$window,loginService){
	$scope.isLoggedin=false;

	$scope.initLogin=function(){
		if(loginService.getUser())
			$scope.isLoggedin=true;
		else{
				$scope.isLoggedin=false;		
		}
	};
	$scope.initLogin();

	$scope.login=function(parms){
		if(parms=='fb'){
			console.log("fb login processs");
			FB.login(function(response){
				if(response.authResponse.accessToken){
					FB.api('/me','GET',{fields:'name,id'}, function(response) {
					      console.log("Response   :"+JSON.stringify(response));
					});
				}else{
					console.log("fb login denied");
				}
			});

		}else{
			gapi.signin.render('gmail-btn',
			           {
			               'callback': $scope.signInCallback,
			               'clientid': '400502752733-lprr94cu90p63bqa66dbksl6q80hts37',
			               'requestvisibleactions': 'http://schemas.google.com/AddActivity',                                                                        // as their explanation is available in Google+ API Documentation.
			               'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
			               'cookiepolicy': 'single_host_origin'
			           }
			);
		}
	};

	$scope.signInCallback = function(authResult) {
        if(authResult['access_token']){
        	$http.get('https://www.googleapis.com/plus/v1/people/me?access_token='+authResult['access_token']).success(function(response){
        		console.log("email :"+response.emails[0].value+"  name : ");
        		console.log(response.displayName);
        	});
        }else{
        	console.log("user denied access");
        }
    };

    $scope.setuser=function(info){
    	console.log(info);
    };
});

app.service('loginService',function($http,$cookieStore){
	this.user=null;
	this.login=function(parms){
		var user=$http.put("../api/me?q=login",parms);
		this.user=user;
		$cookieStore.put('visionuser',user);
	};
	this.logout=function(){
		$http.put("../api/me?q=logout");
		$cookieStore.remove('visionuser');
		this.user=null;
	};
	this.getUser=function(){
		if(this.user)
		{
			return this.user;			
		}
		else if($cookieStore.get('visionuser'))
		{
			var user=$http.put("../api/me?q=setuser",$cookieStore.get('visionuser'));
			this.user=user;
			return this.user;
		}else{
			return null;
		}
	};
});