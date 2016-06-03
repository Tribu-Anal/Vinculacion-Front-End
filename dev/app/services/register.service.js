"use strict";

register.$inject = ['$http'];

function register ($http) {
    var url = 'http://fiasps.unitec.edu:8085/api/Students';
    
    var service = {
        registerStudent: registerStudent
    };
    
    return service;

    function registerStudent (studentData, successCallback, errorCallback) {
        console.log(JSON.stringify(studentData));
        $http.post(url, JSON.stringify(studentData))
             .then(successCallback)
             .catch(errorCallback);
    };
}

module.exports = register;