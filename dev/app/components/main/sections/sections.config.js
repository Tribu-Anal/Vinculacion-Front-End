config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.sections', {
			url: '/secciones',
			templateUrl: 'templates/components/main/sections/sections.html',
			controller: "SectionsController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Secciones";
    	rootScope.viewStyles = "main";
    }
];

module.exports = config;