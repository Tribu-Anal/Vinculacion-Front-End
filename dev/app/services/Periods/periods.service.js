periods.$inject = [ '$http' ];

function periods ($http) {
	const url = 'http://fiasps.unitec.edu:' + PORT + '/api/Periods';
	const service = {
		getWithPagination: getWithPagination
	};

	return service;

	function getWithPagination (page, size, success, error, fin) {
		$http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(success)
            .catch(error)
            .finally(fin);
	}

}

module.exports = { name: 'periods', srvc: periods };