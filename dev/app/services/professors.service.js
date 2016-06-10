(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('professors', professors);

	professors.$inject = ['$http'];

	function professors ($http) {
		var url = 'http://fiasps.unitec.edu:8085/api/Professors';
        
        var service = {
            registerProfessor: registerProfessor
        };
        
        return service;
        
        function registerProfessor(professor, successCallback, errorCallback) {
            console.log(JSON.stringify(professor));
//            $http.post(url, JSON.stringify(professor))
//                 .then(successCallback)
//                 .catch(errorCallback);
        }
	}
})();