(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('horas', horas);

	horas.$inject = ['$http'];

	function horas ($http) {
		var url = 'http://fiasps.unitec.edu:8085/api';
		var service = 
		{
			getStudentsBySection: getStudentsBySection,
			addHours: addHours
		};

		return service;

		function getStudentsBySection (section, successCallback, errorCallback) {
			let request = {
	            method: 'GET',
	            url: url +'/Students'
	        };

	        $http(request).then(successCallback)
                          .catch(errorCallback);
		}

		function addHours (obj, successCallback, errorCallback) {
			let request = {
				method: 'POST',
				url: url + '/Hours',
				data: obj
			};
			$http(request).then(successCallback)
                          .catch(errorCallback);
		}
	}
})();