config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {
	const templateUrl = 'templates/components/main/class-form/class-form.html';

	$stateProvider
		.state('main.new-class', {
			url: '/clases/nueva-clase',
			templateUrl: templateUrl,
			controller: "NewClassController as vm",
			onEnter: onStateEnterNew
		})

		.state('main.edit-class', {
			url: '/clases/editar-clase/{_class}',
			templateUrl: templateUrl,
			controller: "EditClassController as vm",
			onEnter: onStateEnterEdit
		});
}

const onStateEnterNew = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Nueva Clase";
    	rootScope.viewStyles = "main project-form";
    }
],
	onStateEnterEdit = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Editar Clase";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;