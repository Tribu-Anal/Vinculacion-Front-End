settlement.$inject = ['$http'];

function settlement($http) {
    const url = 'http://fiasps.unitec.edu:' + PORT + '/api/Students';
    const service = {
        getPendingFiniquitos: getPendingFiniquitos,
        dowloadFiniquitoReport: dowloadFiniquitoReport
    };

    function getPendingFiniquitos(successCallback, errorCallback) {
        $http.get(url + '/PendingFiniquitoStudents').then(successCallback)
            .catch(errorCallback);
    }

    function dowloadFiniquitoReport(accountId) {
        return url + '/FiniquitoReport/' + accountId;
    }

    return service;
}

module.exports = {
    name: 'settlement',
    srvc: settlement
};