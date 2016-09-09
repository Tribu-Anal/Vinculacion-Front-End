config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {
	const templateUrl = 'templates/components/main/section-form/section-form.html';

	$stateProvider
		.state('main.new-section', {
            url: '/secciones/nueva-seccion',
            templateUrl: templateUrl,
            controller: "NewSectionController as vm",
			onEnter: onNewEnter
		})

		.state('main.edit-section', {
            url: '/secciones/editar-seccion/{section}',
            templateUrl: templateUrl,
            controller: "EditSectionController as vm",
			onEnter: onEditEnter
		});
}

let onNewEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Nueva Seccion";
    	rootScope.viewStyles = "main project-form";
    }
], onEditEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Editar Seccion";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;