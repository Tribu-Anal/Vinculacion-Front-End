config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.import-students', {
			url: '/alumnos/importar-alumnos',
			templateUrl: 'templates/components/main/import-students/import-students.html',
			controller: "ImportStudentsController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Importar Alumnos";
    	rootScope.viewStyles = "main import-students";
    }
];

module.exports = config;