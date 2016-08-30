config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.approve-hours', {
			url: '/aprobar-horas',
			templateUrl: 'templates/components/main/approve-hours/approve-hours.html',
			controller: "ApproveHoursController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Aprobar Horas";
    	rootScope.viewStyles = "main approve-hours";
    }
];

module.exports = config;