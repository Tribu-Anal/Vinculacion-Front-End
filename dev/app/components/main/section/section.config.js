config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.section', {
            url: '/seccion/{sectionId}',
            templateUrl: 'templates/components/main/section/section.html',
            controller: "SectionController as vm",
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Seccion";
    	rootScope.viewStyles = "main section";
    }
];

module.exports = config;