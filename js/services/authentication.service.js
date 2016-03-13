(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('authentication', authentication);

	authentication.$inject = ['$http', '$cookieStore', '$rootScope'];

	function authentication ($http, $cookieStore, $rootScope) {
		var service = {
			Login: Login,
			SetCredentials: SetCredentials,
			ClearCredentials: ClearCredentials
		};

		return service;

		function Login (username, password, successCallback, errorCallback) {
	       $http.post('http://fiasps.unitec.edu:8085/api/Login', JSON.stringify( 
					  { 
					  	User: username, 
					  	Password: password 
					  }
			))
			.then(successCallback, errorCallback); 
	    }
	  
	    function SetCredentials (token) {  
	       $rootScope.globals.token = token;
	  
	       $http.defaults.headers.common['Authorization'] = token;
	       $cookieStore.put('globals', $rootScope.globals);
	    };
	  
	    function ClearCredentials () {
	        $rootScope.globals = {};
	        $cookieStore.remove('globals');
	        $http.defaults.headers.common.Authorization = 'Basic ';
	    };
	}
})();