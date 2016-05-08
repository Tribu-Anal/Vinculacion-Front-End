(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('AddProjectController', AddProjectController);

    AddProjectController.$inject = ['projects', 'sections', 'majors', 'toaster'];

    function AddProjectController (projects, sections, majors, toaster) {
        var vm = this;
        
        vm.sections = [];
        vm.majors = [];
        vm.project = {
            ProjectId: '',
            Name: '',
            Description: '',
            Cost: 0.0,
            MajorIds: [],
            SectionId: 0,            
        }
        
        vm.submitProject = submitProject;
        
        majors.getMajors(getMajorsSuccess, getMajorsFail);
        sections.getSections(getSectionsSuccess, getSectionsFail);
        
        function submitProject() {
            projects.postProject(vm.project, submitProjectSuccess, submitProjectFail);
        }
        
        function getMajorsSuccess(response) {
            fillList(response, vm.majors);
        };
        
        function getSectionsSuccess(response) {
            fillList(response, vm.sections);
        };
        
        function getMajorsFail(response) {
            console.log(response);
        };
        
        function getSectionsFail(response) {
            console.log(response);
        };
        
        function fillList(response, list) {
            console.log(response);
            for(var obj in response.data) {
                list.push(response.data[obj]);
            }
            
            console.log(list);
        }
        
        function submitProjectSuccess() {
            toaster.pop(
                {
                    type: 'success', 
                    title: 'Proyecto Creado', 
                    body: 'El proyecto ha sido agregado con exito!'
                }
            );
        };
        
        function submitProjectFail() {
            toaster.pop(
                {
                    type: 'error', 
                    title: 'Error', 
                    body: 'No se ha podido crear el proyecto.'
                }
            );
        };
    }
})();