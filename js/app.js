"use strict";

var app = angular.module("VinculacionApp", ['ui.router', 'ngAnimate', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('landing', {
			url: '/',
			templateUrl: '../templates/landing.html',
			onEnter: ['ResourceLoader', function(rl) {
				rl.swapResources([
					"css/login.css"
				]);
			}],
            
        controller: 'LoginCtrl as login'
		})

		.state('registro', {
			url: '/registro',
			templateUrl: '../templates/registro.html',
			onEnter: ['ResourceLoader', function(rl) {
				rl.swapResources([
					"https://fonts.googleapis.com/css?family=Roboto",
					"css/registro.css"
				]);
			}],
			controller: 'RegistroCtrl as registro'
		})

		.state('home', {
			url: '/home',
			templateUrl: '../templates/dashboard.html'
		})

		.state('home.proyectos', {
			url: '/proyectos',
			templateUrl: '../templates/proyectos.html'
		})

		.state('home.proyecto', {
			url: '/proyecto',
			templateUrl: '../templates/proyecto.html'
		})

		.state('home.horas', {
			url: '/horas',
			templateUrl: '../templates/horas.html'
		})

		.state('home.solicitudes', {
			url: '/solicitudes',
			templateUrl: '../templates/solicitudes.html',
			onEnter: ['ResourceLoader', function(rl) {
				rl.swapResources([
					"css/solicitudes.css"
				]);
			}]
		})

		.state('home.solicitud', {
			url: '/solicitud',
			templateUrl: '../templates/solicitud.html'
		});
}]); 

  
app.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
                $location.path('/');
            }
        });
        
        $rootScope.links = [];
    }]);
