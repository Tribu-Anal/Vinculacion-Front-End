config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.projects', {
			url: '/proyectos',
			templateUrl: "templates/components/main/projects/projects.html",
			controller: 'ProjectsController as vm',
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Proyectos";
    	rootScope.viewStyles = "main projects";
    }
];

module.exports = config;