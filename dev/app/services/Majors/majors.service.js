majors.$inject = ['$http'];

function majors ($http) {
   var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Majors';
    
    var service = {
        getMajors: getMajors
    };
    
    return service;
    
    function getMajors(successCallback, errorCallback) {
        $http.get(url).then(successCallback)
                      .catch(errorCallback);
    }
}

module.exports = { name: 'majors', srvc: majors };
