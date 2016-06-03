"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.home', {
			url: '/home',
			templateUrl: "templates/components/main/home/home.html",
			controller: 'HomeController as vm',
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Home";
    	rootScope.viewStyles = "main home";
    }
];

module.exports = config;