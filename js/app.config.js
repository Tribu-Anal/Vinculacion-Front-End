(function(){
	"use strict";

	angular
		.module("VinculacionApp")
		.config(config);

	config.$inject = [ '$stateProvider', '$urlRouterProvider' ];

	function config($stateProvider, $urlRouterProvider) {
		setupRoutes($stateProvider, $urlRouterProvider);
	}

	function setupRoutes($stateProvider, $urlRouterProvider) {
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

			.state('nav', {
				templateUrl: '../templates/dashboard.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Ubuntu:400,500",
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css"
					]);
				}],
				controller: 'NavCtrl as nav'
			})

			.state('nav.home', {
				url: '/home',
				templateUrl: '../templates/home.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Ubuntu:400,500",
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css",
						"css/home.css"
					]);
				}],
				controller: 'HomeController as vm'
			})

			.state('nav.proyectos', {
				url: '/proyectos',
				templateUrl: '../templates/proyectos.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Ubuntu:400,500",
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css",
						"css/proyectos.css"
					]);
				}],
				controller: 'ProyectosCtrl as proyectos'
			})

			.state('nav.proyecto', {
				url: '/proyectos/{projectId}',
				templateUrl: '../templates/proyecto.html',
	            onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css",
						"css/proyecto.css"
					]);
				}],
	            controller: 'ProyectosCtrl as proyectos'
			})

			.state('nav.solicitudes', {
				url: '/solicitudes',
				templateUrl: '../templates/solicitudes.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Roboto",
						"css/dashboard.css",
						"css/solicitudes.css"
					]);
				}],
				controller: "solicitudesController as solicitudesCtrl"
			});
	}
})();