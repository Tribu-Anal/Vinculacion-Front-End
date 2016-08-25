config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	 $stateProvider

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
    }
];

const getController = [ '$rootScope', '$templateCache',
	(rootScope, $templateCache) => {
		if($rootScope.Role === 'Student') $templateCache.get('StudentDashboardController as vm');
		if($rootScope.Role === 'Professor') $templateCache.get('ProfessorDashboardController as vm');
    }
];

const onStateEnter = [ '$rootScope',
	rootScope => {
		rootScope.viewTitle  = "Inicio";
    	rootScope.viewStyles = "main dashboard";
    }
];

module.exports = config;
