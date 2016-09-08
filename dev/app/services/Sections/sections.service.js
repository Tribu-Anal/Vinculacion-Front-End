sections.$inject = [ '$http' ];

function sections($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Sections';
    var service = {
        getSections: getSections,
        post: post,
        deleteSection: deleteSection,
        getStudents: getStudents,
        assignStudents: assignStudents,
        reassignStudents: reassignStudents,
        removeStudent: removeStudent,
        update: update,
        getSectionsWithPagination: getSectionsWithPagination,
        getSectionCount: getSectionCount,
        getSection: getSection,
        getCurrentPeriodSections: getCurrentPeriodSections,
        getCurrentSections: getCurrentPeriodSections,
        getProjects: getProjects,
        getSectionsByProject: getSectionsByProject,
        getStudentsHoursBySectionProjectId: getStudentsHoursBySectionProjectId
    };

    return service;

    function getSections(success, error, fin) {
        $http.get(url)
            .then(success)
            .catch(error)
            .finally(fin);
    }

    function post (data, suc, err, fin) {
        $http.post(url, JSON.stringify(data))
            .then(suc)
            .catch(err)
            .finally(fin);
    }

    function deleteSection(sectionId, successCallback, errorCallback) {
        $http.delete(url + '/' + sectionId).then(successCallback)
            .catch(errorCallback);
    }

    function assignStudents (sectionId, studentIds, suc, err, fin) {
        $http.post(url + '/AssignStudents', { SectionId: sectionId, StudenstIds: studentIds })
        .then(suc)
        .catch(err)
        .finally(fin);
    }

     function reassignStudents (sectionId, studentIds, suc, err, fin) {
        $http.post(url + '/Reassign', { SectionId: sectionId, StudenstIds: studentIds })
        .then(suc)
        .catch(err)
        .finally(fin);
    }

    function removeStudent(StudenstIds, sectionId, successCallback, errorCallback) {
        $http.post(url + '/RemoveStudents', {
            SectionId: sectionId,
            StudenstIds: StudenstIds
        }).then(successCallback)
            .catch(errorCallback);
    }

    function update (id, data, suc, err, fin) {
        $http.put(url + "/" + id, data)
            .then(suc)
            .catch(err)
            .finally(fin);
    }

    function getSectionsWithPagination(page, size, success, error, fin) {
        $http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(success)
            .catch(error)
            .finally(fin);
    }

    function getSectionCount(successCallback, errorCallback) {
        $http.get(url + "?$top=1&$orderby=Id desc").then(successCallback)
            .catch(errorCallback);
    }

    function getSection(sectionId, getSectionSuccess, getSectionFail) {
        $http.get(url + '/' + sectionId).then(getSectionSuccess)
            .catch(getSectionFail);
    }

    function getSectionsByProject(projectId, successCallback, errorCallback) {
        $http.get(url + "/SectionsByProject/" + projectId).then(successCallback)
            .catch(errorCallback);
    }


    function getStudents (id, suc, err, fin) {
        $http.get(url + '/Students/' + id)
            .then(suc)
            .catch(err)
            .finally(fin);
    }

    function getProjects(sectionId, successCallback, errorCallback) {
        $http.get(url + '/Projects/' + sectionId).then(successCallback)
            .catch(errorCallback);
    }

    function getCurrentPeriodSections (success, failure, _finally) {
        $http.get(url + '/CurrentPeriodSections')
            .then(success)
            .catch(failure)
            .finally(_finally);
    }

    function getStudentsHoursBySectionProjectId(sectionId, projectId, successCallback, errorCallback) {
        $http.get(url + '/StudentsHour/' + sectionId + '/' + projectId).then(successCallback).catch(errorCallback);
    }

}

module.exports = {
    name: 'sections',
    srvc: sections
};