config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.new-student', {
			url: '/alumnos/nuevo-alumno',
			templateUrl: 'templates/components/main/student-form/student-form.html',
			controller: "StudentFormController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Nuevo Alumno";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;