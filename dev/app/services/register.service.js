(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('register', register);

	register.$inject = ['$http'];

	function register ($http) {
	    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Students';
        
        var service = {
            registerStudent: registerStudent
        };
	    
	    return service;

	    function registerStudent (studentData, successCallback, errorCallback) {
            console.log(JSON.stringify(studentData));
	        $http.post(url, JSON.stringify(studentData))
                 .then(successCallback)
                 .catch(errorCallback);
	    };
	}
})();