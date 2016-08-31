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

const onStateEnter = [ '$rootScope',
	rootScope => {
		rootScope.viewTitle  = "Habilitar Estudiante";
    	rootScope.viewStyles = "landing enablestudent";
    }
];

module.exports = config;
