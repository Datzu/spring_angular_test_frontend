'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [ '$scope', '$http',
	function($scope, $http) {
	
		$scope.getUser = function() {
			if ($scope.userId.trim().trim().length === 0) {
				$scope.data = "";
			} else {
				getUser();
			}
			//getUser();
		}
		
		function getUser() {
			$http.get('http://localhost:9090/user/' + $scope.userId).
			    then(function(response) {
			    	var responseData = response.data;
			    	if (responseData) {
			    		$scope.data = responseData;
			    	}
			    })
			    .catch(function (err) {
			    	$scope.data = "";
			    });
		}

	}
]);