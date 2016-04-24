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

		function getStudentsBySection (section, handleSuccess) {
			let request = {
	            method: 'GET',
	            url: url +'/Students'
	        };

	        $http(request).then( function(data) {
	            handleSuccess(data);
	        });
		}

		function addHours (obj, handleSuccess) {
			let request = {
				method: 'POST',
				url: url + '/Hours',
				data: obj
			};
			$http(request).then(handleSuccess);
		}
	}
})();