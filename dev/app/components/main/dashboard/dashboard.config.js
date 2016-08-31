config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	 $stateProvider

		.state('main.admin-dashboard', {
			url: '/inicio-admin',
			templateUrl: 'templates/components/main/dashboard/admin-dashboard.html',
			controller: 'AdminDashboardController as vm',
			onEnter: onStateEnter
		})

		.state('main.student-dashboard', {
			url: '/inicio-student',
			templateUrl: 'templates/components/main/dashboard/student-dashboard.html',
			controller: 'StudentDashboardController as vm',
			onEnter: onStateEnter
		})

		.state('main.professor-dashboard', {
			url: '/inicio-professor',
			templateUrl: 'templates/components/main/dashboard/professor-dashboard.html',
			controller: 'ProfessorDashboardController as vm',
			onEnter: onStateEnter
		});


}

const getTemplateUrl = [ '$rootScope', '$templateCache',
	(rootScope, $templateCache) => {
		if($rootScope.Role === 'Student') $templateCache.get('templates/components/main/dashboard/student-dashboard.html');
		if($rootScope.Role === 'Professor') $templateCache.get('templates/components/main/dashboard/professor-dashboard.html');
		if($rootScope.Role === 'Admin') $templateCache.get('templates/components/main/dashboard/admin-dashboard.html');
    }
];

const getController = [ '$rootScope', '$templateCache',
	(rootScope, $templateCache) => {
		if($rootScope.Role === 'Student') $templateCache.get('StudentDashboardController as vm');
		if($rootScope.Role === 'Professor') $templateCache.get('ProfessorDashboardController as vm');
		if($rootScope.Role === 'Admin') $templateCache.get('AdminDashboardController as vm');
    }
];

const onStateEnter = [ '$rootScope',
	rootScope => {
		rootScope.viewTitle  = "Inicio";
    	rootScope.viewStyles = "main dashboard";
    }
];

module.exports = config;
