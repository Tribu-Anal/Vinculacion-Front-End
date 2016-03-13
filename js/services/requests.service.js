(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('requests', requests);

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

		function getRequests (handleSuccess) {
			let request = {
	            method: 'GET',
	            url: url +'/Students/Filter/Active'
	        };
	        $http(request).then( function(data) {
	            handleSuccess(data);
	        });
		}

		function rejectRequest (obj, message, handleSuccess) {
			let request = {
				method: 'POST',
				url: url + '/Students/Rejected',
				data: JSON.stringify(
					{ 
						AccountId: obj.AccountId, 
						Message: message
					}
				)
			};
			$http(request).then(function(data) {
	            handleSuccess(data);
	        });
		}

		function acceptRequest (obj, handleSuccess){
			let request = {
				method: 'PUT',
				url: url + '/Students/Verified',
				data: JSON.stringify(
					{
						AccountId: obj.AccountId
					}
				)
			};
			$http(request).then(function(data) {
	            handleSuccess(data);
	        });
		}
	}
})();