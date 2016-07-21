config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('dashboard.sections', {
            url: '/secciones',
            templateUrl: 'templates/components/main/sections/sections.html',
            controller: "SectionsController as vm",
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Secciones";
    	rootScope.viewStyles = "main sections";
    }
];

module.exports = config;