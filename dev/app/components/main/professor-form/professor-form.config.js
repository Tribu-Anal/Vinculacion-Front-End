config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {
	const templateUrl = 'templates/components/main/professor-form/professor-form.html';

	$stateProvider
		.state('main.new-professor', {
			url: '/profesores/nuevo-profesor',
			templateUrl: templateUrl,
			controller: "NewProfessorController as vm",
			onEnter: newProfessorStateEnter
		})

		.state('main.edit-professor', {
			url: '/profesores/editar-profesor/{professor}',
			templateUrl: templateUrl,
			controller: "EditProfessorController as vm",
			onEnter: editProfessorStateEnter
		});
}

let newProfessorStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Nuevo Professor";
    	rootScope.viewStyles = "main project-form";
    }
], editProfessorStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Editar Professor";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;