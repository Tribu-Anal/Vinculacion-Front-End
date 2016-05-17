(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('HomeController', HomeController);

	HomeController.$inject = [ 'recentProjects', 'projects' ];

	function HomeController (recentProjects, projects) {
		var vm = this;
		
		vm.recentProjects = [];

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