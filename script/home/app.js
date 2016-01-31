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
app.controller('loginController',function ($scope,$http,$window,loginService,$cookieStore){
	$scope.isLoggedin=false;

	$scope.initLogin=function(){
		var promise=loginService.inituser();
		if(promise!=null){
			promise.then(function(response){
				if(response.data.result){
					loginService.setuser(response.data);
					$scope.isLoggedin=true;			
				}
			},function(error){
				console.log(error);
			});
		}else{
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
					      parms={username:response.name,access_token:response.id};
					      var result=loginService.login(parms);
					      result.then(function(response){
					      	if(response.data.result=="true"){
								loginService.setuser(response.data);
								$scope.isLoggedin=true;
					      		console.log(response);	
					      	}else{
					      		console.log(response);	
					      	}
					      },function(error){
					      	console.log(error);
					      });
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
        		parms={username:response.displayName,access_token:response.emails[0].value};
        		var result=loginService.login(parms);
			      result.then(function(response){
			      	if(response.data.result=="true"){
						loginService.setuser(response.data);
						$scope.isLoggedin=true;
			      		console.log(response);	
			      	}else{
			      		console.log(response);	
			      	}
			      },function(error){
			      	console.log(error);
			      });
        	});
        }else{
        	console.log("user denied access");
        }
    };
});

app.service('loginService',function($http,$cookieStore){
	this.user=null;
	this.login=function(parms){
		return $http.post("../api/me.php?q=login",parms);
	};
	this.logout=function(){
		$http.post("../api/me.php?q=logout");
		$cookieStore.remove('visionuser');
		this.user=null;
	};
	this.inituser=function(){
		if($cookieStore.get('visionuser'))
		{
			return $http.post("../api/me.php?q=setuser",$cookieStore.get('visionuser'));
		}else{
			return null;
		}
	};

	this.getUser=function(){
		return $http.post("../api/me.php?q=getuser");			
	};

	this.setuser=function(parms){
		this.user=parms;
		$cookieStore.put('visionuser',parms);
	}

});