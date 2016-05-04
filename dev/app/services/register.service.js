(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('register', register);

	register.$inject = ['$http'];

	function register ($http) {
	    var url = 'http://fiasps.unitec.edu:8085/api/Students';
        
        var service = {
            registerStudent: registerStudent
        };
	    
	    return service;

	    function registerStudent (data, successCallback, errorCallback) {
	        $http.post(url, data)
                 .then(successCallback)
                 .catch(errorCallback);
	    };
	}
})();