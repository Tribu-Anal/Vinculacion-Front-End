(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('projects', projects);

	projects.$inject = ['$http'];

	function projects ($http) {
	   var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Projects';

	   var service = {
           getProjects: getProjects,
           getProject: getProject,
           postProject: postProject,
           updateProject: updateProject,
           deleteProject: deleteProject,
           getParticipants:getParticipants,
           getProjectsWithPagination : getProjectsWithPagination,
           getProjectsCount: getProjectsCount
       };
       
       return service;

       function getProjectsWithPagination(page, size, successCallback, errorCallback) {
	        $http.get(url+'?$top='+size+'&$skip='+(page*size)).then(successCallback)
                          .catch(errorCallback);
	   };

	   function getProjects (successCallback, errorCallback) {
	        $http.get(url).then(successCallback)
                          .catch(errorCallback);
	   };

	   function getProjectsCount (successCallback, errorCallback) {
	        $http.get(url+"Count").then(successCallback)
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

	   function getParticipants (projectId, successCallback, errorCallback) {
	   		$http.get(url + "/Students/" + projectId).then(successCallback)
                                            .catch(errorCallback);
	   }
	}
})();