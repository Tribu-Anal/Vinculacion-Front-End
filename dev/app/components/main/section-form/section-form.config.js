config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.new-section', {
            url: '/nueva-seccion',
            templateUrl: 'templates/components/main/section-form/section-form.html',
            controller: "SectionFormController as vm",
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Nueva Seccion";
    	rootScope.viewStyles = "main project-form";
    }
];

module.exports = config;