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

    function getMajorsByProject(projectId) {
        return $http.get(url + '/MajorsByProject/' + projectId).then(function(response) {
            return response.data;
        }, function(response) {
            return $q.reject(response.data);
        });
    }
}

module.exports = { name: 'majors', srvc: majors };
