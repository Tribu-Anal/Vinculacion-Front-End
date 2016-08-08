sections.$inject = ['$http'];

function sections($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Sections';
    var service = {
        getSections: getSections,
        postSection: postSection,
        deleteSection: deleteSection,
        getStudents: getStudents,
        addStudent: addStudent,
        removeStudent: removeStudent,
        updateSection: updateSection,
        getSectionsWithPagination: getSectionsWithPagination,
        getSectionCount: getSectionCount,
        getSection: getSection,
        getCurrentPeriodSections: getCurrentPeriodSections
        getCurrentSections: getCurrentSections,
        getStudents: getStudents,
        getProjects: getProjects,
        getSectionsByProject: getSectionsByProject
    };

    return service;

    function getSections(successCallback, errorCallback) {
        $http.get(url)
            .then(successCallback)
            .catch(errorCallback);
    }

    function postSection(data, successCallback, errorCallback) {
        $http.post(url, JSON.stringify(data))
            .then(successCallback)
            .catch(errorCallback);
    }

    function deleteSection(sectionId, successCallback, errorCallback) {
        console.log("Borrado");
        $http.delete(url + '/' + sectionId).then(successCallback)
            .catch(errorCallback);
    }

    function getStudents(sectionId, successCallback, errorCallback) {
        $http.get(url + '/Students/' + sectionId).then(successCallback)
            .catch(errorCallback);
    }

    function addStudent(StudenstIds, sectionId, successCallback, errorCallback) {
        $http.post(url + '/AssignStudents', {
            SectionId: sectionId,
            StudenstIds: StudenstIds
        }).then(successCallback)
            .catch(errorCallback);
    }

    function removeStudent(StudenstIds, sectionId, successCallback, errorCallback) {
        $http.post(url + '/RemoveStudents', {
            SectionId: sectionId,
            StudenstIds: StudenstIds
        }).then(successCallback)
            .catch(errorCallback);
    }

    function updateSection(data, sectionId, successCallback, errorCallback) {
        $http.put(url + "/" + sectionId, data)
            .then(successCallback)
            .catch(errorCallback);
    }

    function getSectionsWithPagination(page, size, successCallback, errorCallback) {
        $http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc').then(successCallback)
            .catch(errorCallback);
    }

    function getSectionCount(successCallback, errorCallback) {
        $http.get(url + "?$top=1&$orderby=Id desc").then(successCallback)
            .catch(errorCallback);
    }

    function getSection(sectionId, getSectionSuccess, getSectionFail) {
        $http.get(url + '/' + sectionId).then(getSectionSuccess)
            .catch(getSectionFail);
    }

    function getSectionsByProject(projectId, successCallback, errorCallback){
        $http.get(url + "/SectionsByProject/"+projectId).then(successCallback)
            .catch(errorCallback);
    }

    function getCurrentSections(successCallback, errorCallback) {
        $http.get(url + '/CurrentPeriodSections').then(successCallback)
             .catch(errorCallback);
    }

    function getStudents(sectionId, successCallback, errorCallback) {
        $http.get(url + '/Students/' + sectionId).then(successCallback).catch(errorCallback);
    }

    function getProjects(sectionId, successCallback, errorCallback) {
        $http.get(url + '/Projects/' + sectionId).then(successCallback)
            .catch(errorCallback);
    }

    function getCurrentPeriodSections(getCurrentPeriodSectionsSuccess, getCurrentPeriodSectionsFail){
        $http.get(url + '/CurrentPeriodSections').then(getCurrentPeriodSectionsSuccess)
            .catch(getCurrentPeriodSectionsFail);
    }
}

module.exports = {
    name: 'sections',
    srvc: sections
};
