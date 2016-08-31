sectionProjects.$inject = ['$http'];

function sectionProjects ($http) {
	var url = 'http://fiasps.unitec.edu:' + PORT + '/api/';
	const service = {
		getUnapproved: getUnapproved,
		postSectionProjects: postSectionProjects
	};

	return service;

	function getUnapproved(successCallback, errorCallback){
		$http.get(url+'SectionProjects/UnApproved')
			.then(successCallback)
			.catch(errorCallback);
	}

	function postSectionProjects(data, successCallback, errorCallback) {
        $http.post(url+'SectionProjects', JSON.stringify(data))
            .then(successCallback)
            .catch(errorCallback);
    }
}

module.exports = { name: 'sectionProjects', srvc: sectionProjects };
