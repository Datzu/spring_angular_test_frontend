'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$http',
	function($http) {

		var vm = this;

		vm.init = function() {
			vm.userId = "";
		};
	
		vm.getUser = function() {
			if (vm.userId.trim().length === 0) {
				vm.data = "";
			} else {
				getUser();
			}
		};
		
		function getUser() {
			$http.get('http://localhost:9090/user/' + vm.userId).
			    then(function(response) {
			    	var responseData = response.data;
			    	if (responseData) {
			    		vm.data = responseData;
			    	}
			    })
			    .catch(function (err) {
			    	vm.data = "";
			    });
		};

	}
]);