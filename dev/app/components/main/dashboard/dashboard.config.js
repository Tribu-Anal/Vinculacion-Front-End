config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.student-dashboard', {
			url: '/inicio',
			templateUrl: 'templates/components/main/dashboard/Student/student-dashboard.html',
			controller: "StudentDashboardController as vm",
			onEnter: onStateEnter
		});

	$stateProvider
		.state('main.professor-dashboard', {
			url: '/inicio',
			templateUrl: 'templates/components/main/dashboard/Professor/professor-dashboard.html',
			controller: "ProfessorDashboardController as vm",
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
