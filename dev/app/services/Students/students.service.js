students.$inject = ['$http', '$q'];

function students ($http, $q) {
	const url = 'http://fiasps.unitec.edu:' + PORT + '/api/Students';

	const service = {
		get: get,
		getHours: getHours,
		getAccountId: getAccountId,
		getSectionHours: getSectionHours,
		getParsedStudentsExcel: getParsedStudentsExcel,
		importStudents: importStudents,
		enableStudent: enableStudent,
		getWithPagination: getWithPagination
	};

	return service;

	function get (success, error, fin) {
        $http.get(url)
        	.then(success)
            .catch(error)
            .finally(fin);
	}

	function getHours(accountId, successCallback, errorCallback) {
		$http.get(url + '/' + accountId + '/Hour').then(successCallback)
			.catch(errorCallback);
	}

	function getAccountId(successCallback, errorCallback){
				$http.get(url + '/Me').then(successCallback)
						.catch(errorCallback);
	}

	function getSectionHours(accountId, successCallback, errorCallback){
				$http.get(url + '/'+accountId+'/SectionHours').then(successCallback)
						.catch(errorCallback);
	}

	function getParsedStudentsExcel (data) {
		const deferred = $q.defer();

      	$http.post(url+'/Parse', data)
	        .success(response => { deferred.resolve(response); })
	        .error(reject => { deferred.reject('No se pudo cargar el archivo.'); });

	    return deferred.promise;
	}

	function enableStudent(student, suc, err, fin){
		$http.post(url+'/EnableStudent', JSON.stringify(student))
			.then(suc)
			.catch(err)
			finally(fin);
	}

	function importStudents (students) {
		const deferred = $q.defer();

      	$http.post(url+'/Import', students)
	        .success(response => { deferred.resolve(response.data); })
	        .error(reject => { deferred.reject('No se pudo importar los alumnos.'); });

	    return deferred.promise;
	}

	function getWithPagination (page, size, success, error, fin) {
		$http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(success)
            .catch(error)
            .finally(fin);
	}

}

module.exports = { name: 'students', srvc: students };
