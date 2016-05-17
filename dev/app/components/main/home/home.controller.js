(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('HomeController', HomeController);

	HomeController.$inject = [ 'recentProjects', 'projects', 'TbUtils' ];

	function HomeController (recentProjects, projects, TbUtils) {
		var vm = this;
		
		vm.recentProjects = [];
		vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

		getRecentProjects();

		function getRecentProjects () {
			let cachedRecentProjectIds = recentProjects.get();

			for (let projectId in cachedRecentProjectIds)
				projects.getProject(projectId, getProjectSuccess);
		}

		function getProjectSuccess (response) {
			vm.recentProjects.push(response.data);
		}
	}

})();