config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {
	let templateUrl = 'templates/components/main/project-form/project-form.html';

	$stateProvider
		.state('main.new-project', {
			url: '/proyectos/nuevo-proyecto',
			templateUrl: templateUrl,
			controller: 'NewProjectController as vm',
			onEnter: onStateEnterAdd
		})

		.state('main.edit-project', {
			url: '/proyectos/editar-proyecto/?project',
			templateUrl: templateUrl,
			controller: 'EditProjectController as vm',
			onEnter: onStateEnterEdit
		});
}

let onStateEnterAdd = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Nuevo Proyecto";
    	rootScope.viewStyles = "main project-form";
    }
],
	onStateEnterEdit = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Editar Proyecto";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;