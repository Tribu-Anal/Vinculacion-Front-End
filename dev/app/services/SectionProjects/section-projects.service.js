sectionProjects.$inject = ['$http'];

function sectionProjects ($http) {
	var url = 'http://fiasps.unitec.edu:' + PORT + '/api/';
	const service = {
		getUnapproved: getUnapproved
	};

	return service;

	function getUnapproved(successCallback, errorCallback){
		$http.get(url+'SectionProjects/UnApproved')
			.then(successCallback)
			.catch(errorCallback);
	}
}

module.exports = { name: 'sectionProjects', srvc: sectionProjects };
