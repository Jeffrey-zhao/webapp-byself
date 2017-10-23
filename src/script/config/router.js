
'use strict';

angular.module('myApp')
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('home');
	$stateProvider.state('home',{
		url:'/home',
		templateUrl:'view/home.html',
		controller:'HomeCtrl'
	})
	.state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'SearchCtrl'
	})
	.state('me',{
		url:'/me',
		templateUrl:'view/me.html',
		controller:'MeCtrl'
	});
}])