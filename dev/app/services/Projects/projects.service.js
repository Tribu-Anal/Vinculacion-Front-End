projects.$inject = ['$http'];

function projects($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Projects';

    var service = {
        getProjects: getProjects,
        getProject: getProject,
        postProject: postProject,
        updateProject: updateProject,
        deleteProject: deleteProject,
        getParticipants: getParticipants,
        getProjectReportUrl: getProjectReportUrl,
        getProjectsWithPagination: getProjectsWithPagination,
        getProjectsCount: getProjectsCount,
        assignSectionToProject: assignSectionToProject
    };

    return service;

    function getProjectsWithPagination(page, size, successCallback, errorCallback) {
        $http.get(url + '?$top=' + size + '&$skip=' + (page * size) + '&$orderby=Id desc').then(successCallback)
            .catch(errorCallback);
    };

    function getProjects(successCallback, errorCallback) {
        $http.get(url).then(successCallback)
            .catch(errorCallback);
    };

    function getProjectsCount(successCallback, errorCallback) {
        $http.get(url + "Count").then(successCallback)
            .catch(errorCallback);
    };

    function getProject(projectId, successCallback, errorCallback) {
        $http.get(url + "/" + projectId).then(successCallback)
            .catch(errorCallback);
    }

    function getProjectReportUrl(projectId, fieldHours, calification, beneficiariesQuantities, beneficiariGroups) {
        return url + "/FinalReport/" + projectId + "/" + fieldHours + "/" + calification + "/" + beneficiariesQuantities + "/'" + beneficiariGroups + "'";
    }

    function postProject(projectData, successCallback, errorCallback) {
        $http.post(url, JSON.stringify(projectData)).then(successCallback)
            .catch(errorCallback);
    }

    function updateProject(projectId, data, successCallback, errorCallback) {
        $http.put(url + "/" + projectId, data)
            .then(successCallback)
            .catch(errorCallback);
    }

    function deleteProject(projectId, successCallback, errorCallback) {
        $http.delete(url + "/" + projectId)
            .then(successCallback)
            .catch(errorCallback);
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
}

module.exports = { name: 'projects', srvc: projects };