(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('role', role);

	role.$inject = ['$http'];

	function role ($http) {
		var url = 'http://fiasps.unitec.edu:8085/api/Login/GetUserRole/';

		var service = 
		{
			get: get
		};

		return service;

		function get (session, successCallback, errorCallback) {
	        $http.get(url + session)
	        	.then(successCallback)
                .catch(errorCallback);
		}
	}
})();