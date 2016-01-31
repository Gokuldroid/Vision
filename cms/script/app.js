var cms=angular.module('cmshome',['angular-loading-bar','ngSanitize', 'ngAnimate', 'ngRoute', 'ngMessages']);


cms.config(function ($routeProvider) {
	$routeProvider.when('/login',{
		templateUrl:'partials/login.html',
		controller:'loginCtrl'
	}).when('/workshops',{
		templateUrl:'partials/workshops.html',
		controller:'workshopCtrl'
	}).when('/events',{
		templateUrl:'partials/events.html',
		controller:'eventsCtrl'
	}).when('/updates',{
		templateUrl:'partials/updates.html',
		controller:'updatesCtrl'
	}).when('/aboutus',{
		templateUrl:'partials/aboutus.html',
		controller:'aboutusCtrl'
	}).when('/push',{
		templateUrl:'partials/push.html',
		controller:'pushCtrl'
	}).when('/contacts',{
		templateUrl:'partials/contacts.html',
		controller:'contactsCtrl'
	}).otherwise({redirectTo:'/login'});
});


cms.controller('loginCtrl',function ($scope,$http,$rootScope){
	 $scope.login = function () {
        $http({
            method: 'POST',
            url: "http://localhost/cms/api/login.php?q=login",
            data: {password:$scope.login.password,username:$scope.login.username}
        }).success(function (data) {
            if(data=='login success'){
                document.getElementById('usr').innerHTML="Logged in as "+$scope.login.username;
                $rootScope.$broadcast('showMessage',data);
            }else{
                $rootScope.$broadcast('showMessage',data);
            }
        });
    };
    $scope.signup = function () {
        $http({
            method: 'POST',
            url: "http://localhost/cms/api/login.php?q=signup",
            data: {password:$scope.signup.password,username:$scope.signup.username}
        }).success(function (data) {
            $rootScope.$broadcast('showMessage',data);
        });
    };
});

cms.controller('workshopCtrl',function ($scope,$http,$rootScope){

});

cms.controller('eventsCtrl',function ($scope,$http,$rootScope){

});
cms.controller('contactsCtrl',function ($scope,$http,$rootScope){
	$scope.addcontact=function(){
		$http({
		    method: 'POST',
		    url: "http://localhost/cms/api/contacts.php?q=add",
		    data: { name:$scope.name,team:$scope.team,phno:$scope.phonenumber}
		}).success(function (data) {
		    $rootScope.$broadcast('showMessage',data+".Please refresh");
		});
	};

	$scope.contacts=[];
	$http.get("http://localhost/api/contacts.php").success(function (response) {
        $scope.contacts = response;
    });

    $scope.deletecontact=function(parms){
    	$http({
		    method: 'POST',
		    url: "http://localhost/cms/api/contacts.php?q=delete",
		    data: { id:parms}
		}).success(function (data) {
		    $rootScope.$broadcast('showMessage',data+".Please refresh.");
		});
    };
});

cms.controller('updatesCtrl',function ($scope,$http,$rootScope){
	
	$scope.updates=[];

	$scope.addupdate=function(){
		$http({
		    method: 'POST',
		    url: "http://localhost/cms/api/updates.php?q=add",
		    data: { news:$scope.updatemessage }
		}).success(function (data) {
		    $rootScope.$broadcast('showMessage',data+".Please refresh");
		});

	};
	$scope.deleteupdate=function(parms){
		$http({
		    method: 'POST',
		    url: "http://localhost/cms/api/updates.php?q=delete",
		    data: { id:parms}
		}).success(function (data) {
		    $rootScope.$broadcast('showMessage',data+".Please refresh.");
		});
	};

	$http.get("http://localhost/api/updates.php").success(function (response) {
	     $scope.updates = response;
	});

});

cms.controller('aboutusCtrl',function ($scope,$http,$rootScope){
	 CKEDITOR.replace('about-box');
	 $scope.addtab=function(){
	 	var content=CKEDITOR.instances['about-box'].getData();
	 	content=content.replace(new RegExp('\n|\t','g'),'');
 	 	$http({
 		    method: 'POST',
 		    url: "http://localhost/cms/api/aboutus.php?q=add",
 		    data: {title:$scope.title,content:content}
 		}).success(function (data) {
 		    $rootScope.$broadcast('showMessage',data+".Please refresh.");
 		});
	 };
	 $scope.abttabs=[];
	 $http.get("http://localhost/api/aboutus.php").success(function (response) {
	     $scope.abttabs = response;
	 });

	 $scope.deleteTab=function(id){
	 	$http({
		    method: 'POST',
		    url: "http://localhost/cms/api/aboutus.php?q=delete",
		    data: { id:id}
		}).success(function (data) {
		    $rootScope.$broadcast('showMessage',data+".Please refresh.");
		});
	 };
});

cms.controller('pushCtrl',function ($rootScope,$scope,$http){
   	$scope.pushmessage={};
    $scope.push=function(){
    	$http({
            method: 'POST',
            url: "http://localhost/cms/api/sendpush.php",
            data: $scope.pushmessage
        }).success(function (data) {
            if(data=='success'){
				$rootScope.$broadcast('showMessage',"message sent,May be there is delay..please wait");                
            }else{
               $rootScope.$broadcast('showMessage',data);
            }
        });
    };
});

cms.controller('messageCtrl', function ($scope,$timeout){
	$scope.show=false;
	$scope.message="hello";
	$scope.hide=function(){
		$scope.show=false;
	}
	$scope.$on('showMessage',function(event,message){
		$scope.message=message;
		$scope.show=true;
		$timeout(function(){$scope.show=false},10000);
	});

	// $rootScope.$broadcast('showMessage',"message from push");
});