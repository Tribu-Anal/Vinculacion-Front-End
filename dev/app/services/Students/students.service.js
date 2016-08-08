students.$inject = ['$http'];

function students ($http) {
	const url = 'http://fiasps.unitec.edu:' + PORT + '/api/Students';

	const service = {
		get: get,
		getAccountId: getAccountId
	};

	return service;

	function get (successCallback, errorCallback) {
        $http.get(url).then(successCallback)
            .catch(errorCallback);
	}

	function getAccountId(successCallback, errorCallback){
				$http.get(url + '/Me').then(successCallback)
						.catch(errorCallback);
	}
}

module.exports = { name: 'students', srvc: students };
