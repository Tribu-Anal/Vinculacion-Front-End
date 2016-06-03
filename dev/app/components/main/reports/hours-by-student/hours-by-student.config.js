"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.hours-by-student', {
			templateUrl: "templates/components/main/reports/" + 
			             "hours-by-student/hours-by-student.html",
			controller: 'HoursByStudentController as vm',
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Reporte";
    	rootScope.viewStyles = "main hours-by-student";
    }
];

module.exports = config;