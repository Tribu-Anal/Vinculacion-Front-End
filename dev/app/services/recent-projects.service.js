(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('recentProjects', recentProjects);

    recentProjects.$inject = [ '$rootScope' ];

	function recentProjects ($rootScope) {  
        var MAX_RECENT_PROJECTS = 5;
        var storageLocation = 'RecentProjects' + $rootScope.Session;
        var recentProjects = get();

        var service = {
            put: put,
            get: get
        };
        
        return service;

        function put (projectId) {
            let projectIndex = getIndexFromList(projectId);
            let alreadyInList = projectIndex >= 0;

            if (alreadyInList)
                recentProjects.splice(projectIndex, 1);
            else
                checkForOverflow();

            storeRecentProject(projectId);
        }

        function getIndexFromList (projectId) {
            return recentProjects.indexOf(projectId);
        }

        function checkForOverflow () {
            if (recentProjects.length === MAX_RECENT_PROJECTS)
                recentProjects.pop();
        }

        function storeRecentProject (projectId) {
            recentProjects.unshift(projectId);
            window.localStorage[storageLocation] = JSON.stringify(recentProjects);
        }

        function get () {
            let storedPIds = JSON.parse(window.localStorage[storageLocation]);

            return Array.isArray(storedPIds) ? storedPIds : [];
        }

	}
})();