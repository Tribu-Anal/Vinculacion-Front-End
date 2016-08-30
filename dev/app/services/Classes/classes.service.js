
classes.$inject = ['$http'];

function classes($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Classes';
    var service = {
        postClass: postClass
    };

    return service;

    function postClass(data, successCallback, errorCallback) {
        $http.post(url, JSON.stringify(data))
            .then(successCallback)
            .catch(errorCallback);
    }
}

module.exports = {
    name: 'classes',
    srvc: classes
};