(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .factory('reports', reports);

    reports.$inject = ['$http'];

    function reports($http) {
        var service = {
            setReportParams: setReportParams,
            getReportParams: getReportParams
        };
        
        var reportParams = {};
        
        return service;

        function setReportParams(params) {
            reportParams = params;
        }

        function getReportParams() {
            return reportParams;
        }
    }
})();
