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
				templateUrl: templateDir + 'landing/landing.html',
	        	controller: 'LoginController as vm'
			})

			.state('dashboard', {
				templateUrl: templateDir + 'main/main.html',
				controller: 'MainController as mvm'
			})

			.state('dashboard.home', {
				url: '/home',
				templateUrl: templateDir + 'main/home/home.html',
				controller: 'HomeController as vm'
			})

			.state('dashboard.projects', {
				url: '/proyectos',
				templateUrl: templateDir + 'main/projects/projects.html',
				controller: 'ProjectsController as vm'
			})
        
            .state('dashboard.addproject', {
				url: '/nuevo-proyecto',
				templateUrl: templateDir + 'main/project-form/project-form.html',
				controller: 'ProjectFormController as vm'
			})

			.state('dashboard.editproject', {
				url: '/editar-proyecto/{project}',
				templateUrl: templateDir + 'main/project-form/project-form.html',
				controller: 'ProjectFormController as vm'
			})

			.state('dashboard.project', {
				url: '/proyectos/{projectId}',
				templateUrl: templateDir + 'main/project/project.html',
	            controller: 'ProjectController as vm'
			})

			.state('dashboard.requests', {
				url: '/solicitudes',
				templateUrl: templateDir + 'main/requests/requests.html',
				controller: "RequestsController as vm"
			})
        
            .state('dashboard.sections', {
                    url: '/secciones',
                    templateUrl: templateDir + 'main/sections/sections.html',
                    controller: "SectionsController as vm"
                })

			.state('dashboard.newsection', {
				url: '/nueva-seccion',
				templateUrl: templateDir + 'main/section-form/section-form.html',
				controller: "SectionFormController as vm"
			})

			.state('dashboard.printarea', {
				url: '/reporte',
				templateUrl: templateDir + 'main/print-area/print-area.html',
				controller: "PrintAreaController as vm",
				params: {templateDir: templateDir, params: null}
			});
	}
})();