periods.$inject = [ '$http' ];

function periods ($http) {
	const url = 'http://fiasps.unitec.edu:' + PORT + '/api/Periods';
	const service = {
		get: get,
		getWithPagination: getWithPagination,
		setCurrentPeriod: setCurrentPeriod,
		getCurrentPeriod: getCurrentPeriod
	};

	return service;

	function get (success, error, fin) {
		$http.get(url)
            .then(success)
            .catch(error)
            .finally(fin);
	}

	function getWithPagination (page, size, success, error, fin) {
		$http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(success)
            .catch(error)
            .finally(fin);
	}

	function setCurrentPeriod (id, suc, err, fin) {
		$http.put(url+'/SetCurrentPeriod/'+id)
            .then(suc)
            .catch(err)
            .finally(fin);
	}

	function getCurrentPeriod (suc, err, fin) {
		$http.put(url+'/GetCurrentPeriod')
            .then(suc)
            .catch(err)
            .finally(fin);
	}

}

module.exports = { name: 'periods', srvc: periods };