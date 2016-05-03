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
           getProject: getProject
       }
       
       return service;

	   function getProjects (successCallback, errorCallback) {
	        $http.get(url).then(successCallback)
                          .catch(errorCallback);
	   }

	   function getProject (projectId, successCallback, errorCallback) {
	   		$http.get(url + "/" + projectId).then(successCallback)
                                            .catch(errorCallback);
	   }	   
	}
})();