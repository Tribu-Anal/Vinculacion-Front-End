(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('recentProjects', recentProjects);
    
    recentProjects.$inject = ['TbCache'];

	function recentProjects (TbCache) {  
        var MAX_RECENT_PROJECTS = 5;
        var recentProjects = [];

        var service = {
            cache: cache,
            get: get
        };
        
        return service;

        function cache (projectId) {
            recentProjects = get();

            if (noRecentProjectsCached()) 
                recentProjects = [];

            if (!projectAlreadyInList(projectId)) {
                checkForOverflow();
                cacheRecentProject(projectId);
            }
        }

        function noRecentProjectsCached () {
            return recentProjects === undefined;
        }

        function projectAlreadyInList (projectId) {
            return recentProjects.indexOf(projectId) >= 0;
        }

        function checkForOverflow () {
            if (recentProjects.length === MAX_RECENT_PROJECTS)
                recentProjects.pop();
        }

        function cacheRecentProject (projectId) {
            recentProjects.unshift(projectId);
            TbCache.put("RecentProjects", recentProjects);
        }

        function get () {
            return TbCache.get("RecentProjects");
        }

	}
})();