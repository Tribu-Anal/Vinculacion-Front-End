config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.edit-hours', {
			url: '/edit-hours/{projectId}/{sectionId}',
			templateUrl: 'templates/components/main/edit-hours/edit-hours.html',
			controller: "EditHoursController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope',
	rootScope => {
		rootScope.viewTitle  = "Vinculacion | Editar Horas";
    	rootScope.viewStyles = "main edit-hours";
    }
];

module.exports = config;
