"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {
	let templateUrl = 'templates/components/main/project-form/project-form.html',
	    controller  = 'ProjectFormController as vm';

	$stateProvider
		.state('main.addproject', {
			url: '/nuevo-proyecto',
			templateUrl: templateUrl,
			controller: controller,
			onEnter: onStateEnterAdd
		})

		.state('main.editproject', {
			url: '/editar-proyecto/{project}',
			templateUrl: templateUrl,
			controller: controller,
			onEnter: onStateEnterEdit
		});
}

let onStateEnterAdd = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Nuevo Proyecto";
    	rootScope.viewStyles = "main project-form";
    }
],
	onStateEnterEdit = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Editar Proyecto";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;