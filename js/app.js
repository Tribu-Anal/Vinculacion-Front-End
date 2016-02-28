"use strict";

var app = angular.module("VinculacionApp", ['ui.router', 'ngAnimate', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('landing', {
			url: '/',
			templateUrl: '../templates/landing.html'
		})

		.state('registro', {
			url: '/registro',
			templateUrl: '../templates/registro.html'
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
			templateUrl: '../templates/solicitudes.html'
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
    }]);
