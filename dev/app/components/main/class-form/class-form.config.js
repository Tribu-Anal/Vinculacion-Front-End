config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.newclass', {
			url: '/nueva-clase',
			templateUrl: 'templates/components/main/class-form/class-form.html',
			controller: "ClassFormController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Nueva Clase";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;