"use strict";

requests.$inject = ['$http'];

function requests ($http) {
	var url = 'http://fiasps.unitec.edu:8085/api';
	var service = 
	{
		getRequests: getRequests, 
		rejectRequest: rejectRequest,
        acceptRequest: acceptRequest 
	};

	return service;

	function getRequests (successCallback, errorCallback) {
		let request = {
            method: 'GET',
            url: url +'/Students/Filter/Active'
        };
        
        $http(request).then(successCallback)
                      .catch(errorCallback);
	}
    
    function acceptRequest (obj, successCallback, errorCallback){
		let request = {
			method: 'PUT',
			url: url + '/Students/Verified',
			data: JSON.stringify({ AccountId: obj.accountNumber })
		};
        
		$http(request).then(successCallback)
                      .catch(errorCallback);
	}

	function rejectRequest (obj, message, successCallback, errorCallback) {
		let request = {
			method: 'POST',
			url: url + '/Students/Rejected',
			data: JSON.stringify({ AccountId: obj.accountNumber, Message: message })
		};
        
		$http(request).then(successCallback)
                      .catch(errorCallback);
	}
}

module.exports = requests;