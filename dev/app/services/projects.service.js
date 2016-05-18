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
           postProject: postProject,
           updateProject: updateProject,
           deleteProject: deleteProject
       };
       
       return service;

	   function getProjects (successCallback, errorCallback) {
	        $http.get(url).then(successCallback)
                          .catch(errorCallback);
	   };

	   function getProject (projectId, successCallback, errorCallback) {
	   		$http.get(url + "/" + projectId).then(successCallback)
                                            .catch(errorCallback);
	   }
        
       function postProject(projectData, successCallback, errorCallback) {
          $http.post(url, JSON.stringify(projectData)).then(successCallback)
                                                      .catch(errorCallback);
       }

       function updateProject (projectId, data, successCallback, errorCallback) {
       		$http.put(url + "/" + projectId, data)
	   			.then(successCallback)
                .catch(errorCallback);
       }

       function deleteProject (projectId, successCallback, errorCallback) {
	   		$http.delete(url + "/" + projectId)
	   			.then(successCallback)
                .catch(errorCallback);
	   }
	}
})();