"use strict";

var app = angular.module("VinculacionApp", ['ui.router', 'ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	// Por el primer sprint solo las primeras tres rutas
	// estaran disponibles para los alumnos.

	$stateProvider

		.state('login', {
			url: '/login',
			templateUrl: '../templates/login.html'
		})

		.state('registro', {
			url: '/registro',
			templateUrl: '../templates/registro.html'
		})

		.state('home', {
			url: '/home',
			templateUrl: '../templates/home.html'
		})

		.state('home.clases', {
			url: '/clases',
			templateUrl: '../templates/clases.html'
		})

		.state('home.proyectos', {
			url: '/proyectos',
			templateUrl: '../templates/proyectos.html'
		})

		.state('home.proyecto', {
			url: '/proyecto',
			templateUrl: '../templates/proyecto.html'
		});
}]);