projects.$inject = ['$http', '$rootScope', '$state'];

function projects($http, $rootScope, $state) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Projects';

    var service = {
        getProjects: getProjects,
        getProjectsByUser: getProjectsByUser,
        getProject: getProject,
        postProject: postProject,
        updateProject: updateProject,
        deleteProject: deleteProject,
        getParticipants: getParticipants,
        getProjectReportUrl: getProjectReportUrl,
        getProjectsWithPagination: getProjectsWithPagination,
        getProjectsCount: getProjectsCount,
        assignSectionToProject: assignSectionToProject,
        assignProjectstoSection: assignProjectstoSection,
        selectedProjects: [],
        cached: null
    };

    return service;

    function getProjectsWithPagination(page, size, successCallback, errorCallback, fin) {
        let res = ($rootScope.Role === 'Professor') && $state.current.name !== 'main.new-section' ?
                  '/ProjectsByUser' : '';

        $http.get(url + res + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc')
            .then(successCallback)
            .catch(errorCallback)
            .finally(fin);
    };

    function getProjects(success, error, fin) {
        $http.get(url)
            .then(success)
            .catch(error)
            .finally(fin);
    };

    function getProjectsByUser(successCallback, errorCallback) {
        $http.get(url + '/ProjectsByUser').then(successCallback).catch(errorCallback);
    }

    function getProjectsCount(successCallback, errorCallback) {
        $http.get(url + "Count").then(successCallback)
            .catch(errorCallback);
    };

    function getProject(projectId, successCallback, errorCallback) {
        $http.get(url + "/" + projectId).then(successCallback)
            .catch(errorCallback);
    }

    function getProjectReportUrl(projectId,sectionId, fieldHours, calification, beneficiariesQuantities, beneficiariGroups) {
        return url + "/FinalReport/" + projectId +"/"+sectionId + "/" + fieldHours + "/" + calification + "/" + beneficiariesQuantities + "/" + beneficiariGroups + "";
    }

    function postProject(data, suc, err, fin) {
        $http.post(url, JSON.stringify(data))
            .then(suc)
            .catch(err)
            .finally(fin);
    }

    function updateProject(id, data, suc, err, fin) {
        $http.put(url + "/" + id, data)
            .then(suc)
            .catch(err)
            .finally(fin);
    }

    function deleteProject(projectId, success, error, fin) {
        $http.delete(url + "/" + projectId)
            .then(success)
            .catch(error)
            .finally(fin);
    }

    function getParticipants(projectId, successCallback, errorCallback) {
        $http.get(url + "/Students/" + projectId).then(successCallback)
            .catch(errorCallback);
    }

    function assignSectionToProject(ProjectId, SectionId, successCallback, errorCallback) {
        $http.post(url + "/AssignSection", JSON.stringify({
            ProjectId: ProjectId,
            SectionId: SectionId
        })).then(successCallback)
            .catch(errorCallback);
    }

    function assignProjectstoSection(ProjectIds, SectionId, successCallback, errorCallback) {
        $http.post(url + '/AssignProjectsToSection', JSON.stringify({
            ProjectIds: ProjectIds,
            SectionId: SectionId
        })).then(successCallback)
            .catch(errorCallback);
    }
}

module.exports = { name: 'projects', srvc: projects };