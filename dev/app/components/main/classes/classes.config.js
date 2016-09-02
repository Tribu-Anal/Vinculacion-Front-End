config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.classes', {
			url: '/clases',
			templateUrl: 'templates/components/main/classes/classes.html',
			controller: "ClassesController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Clases";
    	rootScope.viewStyles = "main sections";
    }
];

module.exports = config;