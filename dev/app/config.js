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
		let templateDir = "templates/components/";

		$urlRouterProvider.otherwise('/');

		$stateProvider

			.state('landing', {
				url: '/',
				templateUrl: templateDir + 'login/landing.html',
	        	controller: 'LoginController as vm'
			})

			.state('dashboard', {
				templateUrl: templateDir + 'dashboard/dashboard.html',
				controller: 'NavigationController as nav'
			})

			.state('dashboard.home', {
				url: '/home',
				templateUrl: templateDir + 'home/home.html',
				controller: 'HomeController as vm'
			})

			.state('dashboard.projects', {
				url: '/proyectos',
				templateUrl: templateDir + 'projects/projects.html',
				controller: 'ProjectsController as vm'
			})

			.state('dashboard.project', {
				url: '/proyectos/{projectId}',
				templateUrl: templateDir + 'project/project.html',
	            controller: 'ProjectController as vm'
			})

			.state('dashboard.requests', {
				url: '/solicitudes',
				templateUrl: templateDir + 'requests/requests.html',
				controller: "RequestsController as vm"
			});
	}
})();