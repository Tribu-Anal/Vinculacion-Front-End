professors.$inject = ['$http'];

function professors ($http) {
	var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Professors';
    
    var service = {
        registerProfessor: registerProfessor,
        activateProfessor: activateProfessor,
        getActiveProfessor: getActiveProfessor
    };
    
    return service;
    
    function registerProfessor(professor, successCallback, errorCallback) {
        console.log(JSON.stringify(professor));
        $http.post(url, JSON.stringify(professor))
             .then(successCallback)
             .catch(errorCallback);
    }
    
    function activateProfessor(professor, successCallback, errorCallback) {
        console.log(JSON.stringify(professor));
        $http.post(url + '/Verified', JSON.stringify(professor))
             .then(successCallback)
             .catch(errorCallback);
    }

    function getActiveProfessor(professorId, successCallback, errorCallback) {
        $http.get(url + '?$filter=Id eq ' + professorId).then(successCallback)
             .catch(successCallback);
    }
}

module.exports = { name: 'professors', srvc: professors };