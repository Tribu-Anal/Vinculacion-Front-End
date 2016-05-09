(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.service('projects', projects);

	projects.$inject = ['$http'];

	function projects ($http) {
	   var url = 'http://fiasps.unitec.edu:8085/api/Projects';
	   
	   this.getProjects = getProjects;
	   this.getProject = getProject;
	   this.deleteProject = deleteProject;

	   function getProjects (successCallback, errorCallback) {
	        $http.get(url).then(successCallback, errorCallback);
	   }

	   function getProject (projectId, successCallback, errorCallback) {
	   		$http.get(url + "/" + projectId).then(successCallback, errorCallback);
	   }

	   function deleteProject (projectId, successCallback, errorCallback) {
	   		$http.delete(url + "/" + projectId)
	   			.then(successCallback, errorCallback);
	   }
	   
	}
})();