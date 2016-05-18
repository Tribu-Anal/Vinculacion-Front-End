(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('HomeController', HomeController);

	HomeController.$inject = [ '$rootScope', 'recentProjects', 'projects', 'TbUtils' ];

	function HomeController ($rootScope, recentProjects, projects, TbUtils) {
		var vm = this;
		
		vm.recentProjects = [];
		vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

		getRecentProjects();

		function getRecentProjects () {
			let storedRecentProjectIds = recentProjects.get($rootScope.Session);
			
			for (let i = 0; i < storedRecentProjectIds.length; i++)
				projects.getProject(storedRecentProjectIds[i], getProjectSuccess);
		}

		function getProjectSuccess (response) {
			vm.recentProjects.push(response.data);
		}
	}

})();