(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.service('register', register);

	register.$inject = ['$http'];

	function register ($http) {
	    var url = 'http://fiasps.unitec.edu:8085/api/Students';
	    
	    this.registerStudent = registerStudent;

	    function registerStudent (data) {
	        return $http.post(url, data);
	    }
	}
})();