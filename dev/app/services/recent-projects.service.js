(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('recentProjects', recentProjects);

	function recentProjects () {  
        var MAX_RECENT_PROJECTS = 5;
        var recentProjects = [];

        var service = {
            put: put,
            get: get
        };
        
        return service;

        function put (session, projectId) {
            let projectIndex = getIndexFromList(projectId);
            let alreadyInList = projectIndex >= 0;

            recentProjects = get(session);

            if (alreadyInList)
                recentProjects.splice(projectIndex, 1);
            else
                checkForOverflow();

            storeRecentProject(session, projectId);
        }

        function getIndexFromList (projectId) {
            return recentProjects.indexOf(projectId);
        }

        function checkForOverflow () {
            if (recentProjects.length === MAX_RECENT_PROJECTS)
                recentProjects.pop();
        }

        function storeRecentProject (session, projectId) {
            recentProjects.unshift(projectId);
            localStorage.setItem(session, JSON.stringify(recentProjects));
        }

        function get (session) {
            let data = localStorage.getItem(session);
            let storedPIds = data ? JSON.parse(data) : [];

            return Array.isArray(storedPIds) ? storedPIds : [];
        }

	}
})();