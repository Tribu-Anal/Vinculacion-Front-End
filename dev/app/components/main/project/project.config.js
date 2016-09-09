"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.project', {
			url: '/proyectos/?project',
			templateUrl: "templates/components/main/project/project.html",
			controller: 'ProjectController as vm',
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Proyecto";
    	rootScope.viewStyles = "main project";
    }
];

module.exports = config;