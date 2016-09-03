"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.new-professor', {
			url: '/profesores/nuevo-profesor',
			templateUrl: 'templates/components/main/professor-form/professor-form.html',
			controller: "ProfessorFormController as vm",
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Nuevo Professor";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;