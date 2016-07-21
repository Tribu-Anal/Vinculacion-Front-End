"use strict";

role.$inject = ['$http'];

function role ($http) {
	var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Login/GetUserRole/';

	var service = 
	{
		get: get
	};

	return service;

	function get (session, successCallback, errorCallback) {
        $http.post(url, JSON.stringify({ Email: session }))
        	.then(successCallback)
            .catch(errorCallback);
	}
}

module.exports = role;
