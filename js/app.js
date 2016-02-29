"use strict";

var app = angular.module("VinculacionApp", ['ui.router', 'ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('landing', {
			url: '/',
			templateUrl: '../templates/landing.html'
		})

		.state('registro', {
			url: '/registro',
			templateUrl: '../templates/registro.html',
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
			templateUrl: '../templates/solicitudes.html'
		})

		.state('home.solicitud', {
			url: '/solicitud',
			templateUrl: '../templates/solicitud.html'
		});

}]);

app.run([ '$rootScope', function($rootScope) {
	$rootScope.links = [];
}]);
