sectionProjects.$inject = ['$http'];

function sectionProjects ($http) {
	var url = 'http://fiasps.unitec.edu:' + PORT + '/api/SectionProjects';
	const service = {
		getUnapproved: getUnapproved,
		post: post,
		getSectionProject: getSectionProject
	};

	return service;

	function getUnapproved(suc, err, fin){
		$http.get(url+'/UnApproved')
			.then(suc)
			.catch(err)
			.finally(fin);
	}

	function post (data, suc, err, fin) {
        $http.post(url, JSON.stringify(data))
            .then(suc)
            .catch(err)
            .finally(fin);
    }

    function getSectionProject(sectionId, projectId, successCallback, errorCallback){
    	$http.get(url+'/Info/'+sectionId+'/'+projectId)
    	.then(successCallback)
		.catch(errorCallback);
    }
}

module.exports = { name: 'sectionProjects', srvc: sectionProjects };
