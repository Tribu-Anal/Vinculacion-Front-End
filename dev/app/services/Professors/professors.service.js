professors.$inject = ['$http'];

function professors($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Professors';

    var service = {
        registerProfessor: registerProfessor,
        activateProfessor: activateProfessor,
        getActiveProfessor: getActiveProfessor,
        getWithPagination: getWithPagination,
        get: get,
        update: update
    };

    return service;

    function registerProfessor(professor, successCallback, errorCallback) {
        $http.post(url, JSON.stringify(professor))
            .then(successCallback)
            .catch(errorCallback);
    }

    function activateProfessor(professor, successCallback, errorCallback) {
        $http.post(url + '/Verified', JSON.stringify(professor))
            .then(successCallback)
            .catch(errorCallback);
    }

    function getActiveProfessor(professorId, successCallback, errorCallback) {
        $http.get(url + '?$filter=Id eq ' + professorId).then(successCallback)
            .catch(errorCallback);
    }

    function getWithPagination (page, size, success, error, fin) {
        $http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(success)
            .catch(error)
            .finally(fin);
    }

    function get (success, error, fin) {
        $http.get(url)
            .then(success)
            .catch(error)
            .finally(fin);
    }

    function update (id, data, suc, err, fin) {
        $http.put(url+'/'+id, data)
            .then(suc)
            .catch(err)
            .finally(fin);
    }

}

module.exports = {
    name: 'professors',
    srvc: professors
};