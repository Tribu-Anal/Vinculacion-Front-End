"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.printarea', {
			url: '/reporte',
			templateUrl: "templates/components/main/print-area/print-area.html",
			controller: 'PrintAreaController as vm',
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Reporte";
    	rootScope.viewStyles = "main print-area";
    }
];

module.exports = config;