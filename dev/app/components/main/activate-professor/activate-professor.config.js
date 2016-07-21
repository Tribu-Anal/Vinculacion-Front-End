config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('dashboard.activateprofessor', {
			url: '/registro-maestro/{accountId}',
			templateUrl: templateDir + 'main/professor-form/activate-professor/activate-professor.html',
			controller: "ActivateProfessorController as vm"
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Activar Professor";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;