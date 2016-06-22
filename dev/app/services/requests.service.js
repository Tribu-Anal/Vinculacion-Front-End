(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('requests', requests);

	requests.$inject = ['$http'];

	function requests ($http) {
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
	            url: URL +'/Students/Filter/Active'
	        };
            
	        $http(request).then(successCallback)
                          .catch(errorCallback);
		}
        
        function acceptRequest (obj, successCallback, errorCallback){
			let request = {
				method: 'PUT',
				url: URL + '/Students/Verified',
				data: JSON.stringify({ AccountId: obj.accountNumber })
			};
            
			$http(request).then(successCallback)
                          .catch(errorCallback);
		}

		function rejectRequest (obj, message, successCallback, errorCallback) {
			let request = {
				method: 'POST',
				url: URL + '/Students/Rejected',
				data: JSON.stringify({ AccountId: obj.accountNumber, Message: message })
			};
            
			$http(request).then(successCallback)
                          .catch(errorCallback);
		}
	}
})();