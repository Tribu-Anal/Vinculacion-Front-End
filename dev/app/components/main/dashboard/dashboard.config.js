config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.student-dashboard', {
			url: '/inicio',
			templateUrl: 'templates/components/main/dashboard/student-dashboard.html',
			controller: "StudentDashboardController as vm",
			onEnter: onStateEnter
		});
		
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Inicio";
    	rootScope.viewStyles = "main dashboard";
    }
];

module.exports = config;
