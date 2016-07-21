professors.$inject = ['$http'];

function professors ($http) {
	var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Professors';
    
    var service = {
        registerProfessor: registerProfessor,
        activateProfessor: activateProfessor
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
}

module.exports = { name: 'professors', srvc: professors };