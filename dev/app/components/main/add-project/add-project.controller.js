(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('AddProjectController', AddProjectController);

    AddProjectController.$inject = ['projects', 'sections', 'majors', 'toaster', '$location'];

    function AddProjectController (projects, sections, majors, toaster, $location) {
        var vm = this;
        
        vm.sections = [];
        vm.majors = [];
        vm.project = {
            ProjectId: '',
            Name: '',
            Description: '',
            Cost: 0.0,
            MajorIds: [],
            SectionId: 0            
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
            vm.project.SectionId = vm.sections[0].Id;
        };
        
        function getMajorsFail(response) {
            console.log(response);
            displayNotification('error', 'Error',
                                'Hay un problema con el servidor. No se ha podido obtener las carreras disponibles.');
        };
        
        function getSectionsFail(response) {
            console.log(response);
            displayNotification('error', 'Error',
                                'Hay un problema con el servidor. No se ha podido obtener las secciones disponibles.');
        };
        
        function submitProjectSuccess() {
            displayNotification('success', 'Proyecto Creado', 'El proyecto ha sido agregado con exito!');
            $location.path('/proyectos');
        };
        
        function submitProjectFail() {
            displayNotification('error', 'Error', 'No se ha podido crear el proyecto.');
        };
        
        function fillList(response, list) {
            console.log(response);
            for(var obj in response.data) {
                list.push(response.data[obj]);
            }
            
            console.log(list);
        };
        
        function displayNotification(type, title, body) {
            toaster.pop(
                {
                    type: type, 
                    title: title, 
                    body: body
                }
            );
        }
    }
})();