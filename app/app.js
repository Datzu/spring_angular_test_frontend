'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.home',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version'
])
.config(config)
.run(run);


config.$inject = ['$locationProvider', '$routeProvider'];
function config($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider.otherwise({redirectTo: '/login'});
};

run.$inject = ['$rootScope', '$location', '$http', '$window'];
function run($rootScope, $location, $http, $window) {
    var userData = $window.sessionStorage.getItem('userData');
    if (userData) {
        $http.defaults.headers.common['Authorization']
          = 'Basic ' + JSON.parse(userData).authData;
    }

    $rootScope
    .$on('$locationChangeStart', function (event, next, current) {
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn
          = $window.sessionStorage.getItem('userData');
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
};
