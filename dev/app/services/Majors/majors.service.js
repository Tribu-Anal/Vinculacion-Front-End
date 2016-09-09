majors.$inject = ['$http', '$q'];

function majors ($http, $q) {
   var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Majors';
    
    var service = {
        getMajors: getMajors,
        getMajor : getMajor,
        getMajorsByProject: getMajorsByProject
    };
    
    return service;
    
    function getMajors(successCallback, errorCallback, fin) {
        $http.get(url).then(successCallback)
                      .catch(errorCallback)
                      .finally(fin);
    }

    function getMajor(majorId, successCallback, errorCallback) {
    	$http.get(url + '/' + majorId).then(successCallback)
    		 .catch(errorCallback);
    }

    function getMajorsByProject(id, suc, err, fin) {
        $http.get(url + '/MajorsByProject/' + id)
            .then(suc)
            .catch(err)
            .finally(fin);
    }
}

module.exports = { name: 'majors', srvc: majors };
