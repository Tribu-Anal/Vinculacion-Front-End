hours.$inject = ['$http'];

function hours($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api';
    var service = {
        getStudentsBySection: getStudentsBySection,
        postHours: postHours,
        getStudentHourReport: getStudentHourReport,
        getFiniquitoURL: getFiniquitoURL,
        getHoursInfoSectionProjects:getHoursInfoSectionProjects,
        putSectionProjectsApprove:putSectionProjectsApprove
    };

    return service;

    function getStudentsBySection(section, successCallback, errorCallback) {
        let request = {
            method: 'GET',
            url: url + '/Students'
        };

        $http(request).then(successCallback)
            .catch(errorCallback);
    }

    function postHours(hoursData, successCallback, errorCallback) {
        $http.post(url + '/Hours/AddMany', JSON.stringify(hoursData)).then(successCallback)
            .catch(errorCallback);
    }

    function getStudentHourReport(accountId, successCallback, errorCallback) {
        $http.get(url + '/StudentHourReport/' + accountId).
        then(successCallback).catch(errorCallback);
    }

    function getFiniquitoURL(accountId) {
        return url + '/Students/FiniquitoReport/' + accountId;
    }

    function getHoursInfoSectionProjects(sectionprojectId, success, error, fin){
        $http.get(url + '/SectionProjects/Info/' + sectionprojectId)
        .then(success)
        .catch(error)
        .finally(fin);
    }
    
    function putSectionProjectsApprove(sectionprojectId, success, error, fin){
        $http.put(url + '/SectionProjects/Approve/' + sectionprojectId)
        .then(success)
        .catch(error)
        .finally(fin);
    }
}

module.exports = { name: 'hours', srvc: hours };
