config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.students', {
			url: '/alumnos',
			templateUrl: 'templates/components/main/students/students.html',
			controller: "StudentsController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Alumnos";
    	rootScope.viewStyles = "main";
    }
];

module.exports = config;