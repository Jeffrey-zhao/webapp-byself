'use strict';

angular.module('myApp')
.directive('appHead',[function(){
	return {
		restrict:"AE",
		templateUrl:"view/tpls/app-head.html",
		replace:true	
	};
}]);