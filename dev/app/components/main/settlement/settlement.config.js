config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.settlement', {
			url: '/finiquitos',
			templateUrl: 'templates/components/main/settlement/settlement.html',
			controller: "SettlementController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Finiquitos";
    	rootScope.viewStyles = "main settlement";
    }
];

module.exports = config;