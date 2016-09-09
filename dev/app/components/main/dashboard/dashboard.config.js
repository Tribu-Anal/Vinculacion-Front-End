config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	 $stateProvider

		.state('main.admin-dashboard', {
			url: '/inicio',
			templateUrl: 'templates/components/main/dashboard/admin-dashboard.html',
			controller: 'AdminDashboardController as vm',
			onEnter: onStateEnter
		})

		.state('main.student-dashboard', {
			url: '/inicio',
			templateUrl: 'templates/components/main/dashboard/student-dashboard.html',
			controller: 'StudentDashboardController as vm',
			onEnter: onStateEnter
		})

		.state('main.professor-dashboard', {
			url: '/inicio',
			templateUrl: 'templates/components/main/dashboard/professor-dashboard.html',
			controller: 'ProfessorDashboardController as vm',
			onEnter: onStateEnter
		});

}

const onStateEnter = [ '$rootScope',
	rootScope => {
		rootScope.viewTitle  = "Vinculacion | Inicio";
    	rootScope.viewStyles = "main dashboard";
    }
];

module.exports = config;
