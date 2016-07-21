"use strict";

sections.$inject = ['$http'];

function sections ($http) {
    var url = 'http://fiasps.unitec.edu:' + PORT + '/api/Sections';
    var service = {
        getSections: getSections,
        postSection: postSection,
        deleteSection: deleteSection,
        getStudents: getStudents,
        addStudent: addStudent,
        removeStudent: removeStudent,
        updateSection: updateSection
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
}

module.exports = sections;
