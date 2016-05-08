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
            if(validateFields())
                projects.postProject(vm.project, submitProjectSuccess, submitProjectFail);
            else
                displayNotification('warning', 'Campos vacios',
                                    'El campo de carreras o secciones no puede estar vacio!');
        }
        
        function getMajorsSuccess(response) {
            fillList(response, vm.majors);
        };
        
        function getSectionsSuccess(response) {
            fillList(response, vm.sections);
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
        
        function validateFields() {
            if(vm.project.MajorIds.length > 0 && vm.project.SectionId !== 0)
                return true;
            
            return false;
        };
    }
})();