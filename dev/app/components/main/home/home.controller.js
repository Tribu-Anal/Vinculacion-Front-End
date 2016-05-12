(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('HomeController', HomeController);

	function HomeController () {
		var vm = this;
		
		vm.recentProjects = [];

		function getRecentProjects() {
		}
	}

})();