config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('landing.enable-student', {
			url: '/habilitar-estudiante',
			templateUrl: 'templates/components/landing/enable-student/enable-student.html',
			controller: "EnableStudentController as vm",
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope',
	function(rootScope){
		rootScope.viewTitle  = "Registrar Estudiante";
    	rootScope.viewStyles = "landing activate-professor";
    }
];

module.exports = config;
