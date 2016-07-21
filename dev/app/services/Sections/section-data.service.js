"use strict";

sectionData.$inject = ['$http'];

function sectionData ($http) {
   var url = 'http://fiasps.unitec.edu:' + PORT + '/api/';
    
    var service = {
        getClasses: getClasses,
        getProfessors: getProfessors,
        getPeriods: getPeriods
    };
    
    return service;
    
    function getClasses (successCallback, errorCallback) {
        $http.get(url+'Classes')
        	.then(successCallback)
            .catch(errorCallback);
    }

    function getProfessors (successCallback, errorCallback) {
        $http.get(url+'Professors')
            .then(successCallback)
            .catch(errorCallback);
    }

    function getPeriods (successCallback, errorCallback) {
        $http.get(url+'Periods')
        	.then(successCallback)
            .catch(errorCallback);
    }

}

module.exports = sectionData;
