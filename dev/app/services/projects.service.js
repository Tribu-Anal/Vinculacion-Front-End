(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('projects', projects);

	projects.$inject = ['$http'];

	function projects ($http) {
	   var url = 'http://fiasps.unitec.edu:8085/api/Projects';
    
	   var service = {
           getProjects: getProjects,
           getProject: getProject,
           postProject: postProject
       };
       
       return service;

	   function getProjects (successCallback, errorCallback) {
	        $http.get(url).then(successCallback)
                          .catch(errorCallback);
	   };

	   function getProject (projectId, successCallback, errorCallback) {
	   		$http.get(url + "/" + projectId).then(successCallback)
                                            .catch(errorCallback);
	   };
        
       function postProject(projectData, successCallback, errorCallback) {
           console.log(JSON.stringify(projectData));
          $http.post(url, JSON.stringify(projectData)).then(successCallback)
                                                      .catch(errorCallback);
       };
	}
})();