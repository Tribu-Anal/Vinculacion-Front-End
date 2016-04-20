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
	        	controller: 'LoginController as vm'
			})

			.state('dashboard', {
				templateUrl: '../templates/dashboard.html',
				controller: 'NavigationController as nav'
			})

			.state('dashboard.home', {
				url: '/home',
				templateUrl: '../templates/home.html',
				controller: 'HomeController as vm'
			})

			.state('dashboard.projects', {
				url: '/proyectos',
				templateUrl: '../templates/projects.html',
				controller: 'ProjectsController as vm'
			})

			.state('dashboard.project', {
				url: '/proyectos/{projectId}',
				templateUrl: '../templates/project.html',
	            controller: 'ProjectController as vm'
			})

			.state('dashboard.requests', {
				url: '/solicitudes',
				templateUrl: '../templates/requests.html',
				controller: "RequestsController as vm"
			});
	}
})();