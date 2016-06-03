"use strict";

config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main', {
			templateUrl: "templates/components/main/main.html",
			controller: "MainController as mvm"
		});
}

module.exports = config;