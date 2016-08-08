students.$inject = [ '$http' ];

function students ($http) {
	const url = 'http://fiasps.unitec.edu:' + PORT + '/api/Students';

	const service = {
		get: get,
		getHours: getHours
	};

	return service;

	function get (successCallback, errorCallback) {
        $http.get(url).then(successCallback)
            .catch(errorCallback);
	}

	function getHours(accountId, successCallback, errorCallback) {
		$http.get(url + '/' + accountId + '/Hour').then(successCallback)
			.catch(errorCallback);
	}
}

module.exports = { name: 'students', srvc: students };