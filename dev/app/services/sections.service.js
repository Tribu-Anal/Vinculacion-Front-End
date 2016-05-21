(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('sections', sections);

	sections.$inject = ['$http'];

	function sections ($http) {
	   var url = 'http://fiasps.unitec.edu:8085/api/Sections';
        
        var service = {
            getSections: getSections,
            postSection: postSection,
            deleteSection: deleteSection,
            getStudents: getStudents,
            addStudent: addStudent
        };
        
        return service;
        
        function getSections (successCallback, errorCallback) {
            $http.get(url)
            	.then(successCallback)
              	.catch(errorCallback);
        }

        function postSection (data, successCallback, errorCallback) {
        	$http.post(url, JSON.stringify(data))
        		.then(successCallback)
                .catch(errorCallback);
        }
        
        function deleteSection(sectionId, successCallback, errorCallback) {
            console.log("Borrado");
            $http.delete(url + '/' + sectionId).then(successCallback)
                                               .catch(errorCallback);
        }
        
        function getStudents(sectionId, successCallback, errorCallback) {
            $http.get(url + '/Students/' + sectionId).then(successCallback)
                                                     .catch(errorCallback);
        }
        
        function addStudent(studentId, sectionId, successCallback, errorCallback) {
            console.log("Agregado");
            $http.post(url + '/AssignStudent', {SectionId: sectionId, StudentId: studentId})
                 .then(successCallback)
                 .catch(errorCallback);
        }
	}
})();