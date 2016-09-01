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
		enableStudent: enableStudent
	};

	return service;

	function get (successCallback, errorCallback) {
        $http.get(url).then(successCallback)
            .catch(errorCallback);
	}

	function getHours(accountId, successCallback, errorCallback) {
		$http.get(url + '/' + accountId + '/Hour').then(successCallback)
			.catch(errorCallback);

		// return $http.get(url + '/' + accountId + '/Hour').then(function(response) {
		// 	return response.data;
		// });
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
	        .success(response => { deferred.resolve(response.data); })
	        .error(reject => { deferred.reject('No se pudo cargar el archivo.'); });

	    return deferred.promise;
	}

	function enableStudent(student, successCallback, errorCallback){
		$http.post(url+'/EnableStudent', JSON.stringify(student)).then(successCallback)
				.catch(errorCallback);
	}

	function importStudents (students) {
		const deferred = $q.defer();

      	$http.post(url+'/Import', students)
	        .success(response => { deferred.resolve(response.data); })
	        .error(reject => { deferred.reject('No se pudo importar los alumnos.'); });

	    return deferred.promise;
	}

}

module.exports = { name: 'students', srvc: students };
