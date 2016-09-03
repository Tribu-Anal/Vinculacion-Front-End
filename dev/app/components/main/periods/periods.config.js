config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.periods', {
			url: '/periodos',
			templateUrl: 'templates/components/main/periods/periods.html',
			controller: "PeriodsController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Periodos";
    	rootScope.viewStyles = "main";
    }
];

module.exports = config;