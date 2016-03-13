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
	            
	        controller: 'LoginController as vm'
			})

			.state('dashboard', {
				templateUrl: '../templates/dashboard.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Ubuntu:400,500",
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css"
					]);
				}],
				controller: 'NavigationController as nav'
			})

			.state('dashboard.home', {
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

			.state('dashboard.projects', {
				url: '/proyectos',
				templateUrl: '../templates/projects.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Ubuntu:400,500",
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css",
						"css/projects.css"
					]);
				}],
				controller: 'ProjectsController as vm'
			})

			.state('dashboard.project', {
				url: '/proyectos/{projectId}',
				templateUrl: '../templates/project.html',
	            onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Roboto:400,500",
						"css/dashboard.css",
						"css/project.css"
					]);
				}],
	            controller: 'ProjectController as vm'
			})

			.state('dashboard.requests', {
				url: '/solicitudes',
				templateUrl: '../templates/requests.html',
				onEnter: ['ResourceLoader', function(rl) {
					rl.swapResources([
						"https://fonts.googleapis.com/css?family=Roboto",
						"css/dashboard.css",
						"css/requests.css"
					]);
				}],
				controller: "RequestsController as vm"
			});
	}
})();