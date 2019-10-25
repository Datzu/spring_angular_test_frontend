(function () {
    'use strict';
    angular
        .module('myApp.home', [])
        .config(['$routeProvider', function($routeProvider) {
		  $routeProvider.when('/', {
		    templateUrl: 'home/home.html',
		    controller: 'HomeController',
		    controllerAs: 'vm'
		  });
		}])
        .controller('HomeController', HomeController);
 
    HomeController.$inject = ['$window', '$http', '$scope'];
    function HomeController($window, $http, $scope) {
        var vm = this;
        vm.user = null;
 
        initController();
 
        function initController() {
			$http.get('http://localhost:9090/user')
				.then(function(response) {
			    	console.log("OK", response);
	                vm.user = response.data.name;
			    })
			    .catch(function (err) {
			    	console.log("ERROR", err);
			    });
        };
 
        $scope.logout = function () {
            $window.sessionStorage.setItem('userData', '');
            $http.defaults.headers.common['Authorization'] = 'Basic';
        }
    }
})();