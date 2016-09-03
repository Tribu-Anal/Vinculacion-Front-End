config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.professors', {
			url: '/profesores',
			templateUrl: 'templates/components/main/professors/professors.html',
			controller: "ProfessorsController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Profesores";
    	rootScope.viewStyles = "main";
    }
];

module.exports = config;