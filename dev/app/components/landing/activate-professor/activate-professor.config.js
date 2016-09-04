config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('landing.activate-professor', {
			url: '/registro-maestro/{accountId}',
			templateUrl: 'templates/components/landing/activate-professor/activate-professor.html',
			controller: "ActivateProfessorController as vm",
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Activar Professor";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;