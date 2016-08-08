config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('dashboard-inicio', {
			url: '/inicio',
			templateUrl: getTemplateUrl($rootScope),
			controller: getController($rootScope),
			onEnter: onStateEnter
		});
		
}

getTemplateUrl.$inject = ['$rootScope'];

function getTemplateUrl($rootScope) {
	if($rootScope.Role === 'Student') return 'templates/components/main/dashboard/student-dashboard.html';
	else return 'templates/components/main/dashboard/professor-dashboard.html';
}

getController.$inject = ['$rootScope'];
function getController($rootScope) {
	if($rootScope.Role === 'Student') return 'StudentDashboardController as vm';
	else return 'ProfessorDashboardController as vm';
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Inicio";
    	rootScope.viewStyles = "main dashboard";
    }
];

module.exports = config;
