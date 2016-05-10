(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('AddProjectController', AddProjectController);

    AddProjectController.$inject = ['projects', 'sections', 'majors', 'toaster', 'TbUtils', '$location'];

    function AddProjectController (projects, sections, majors, toaster, TbUtils, $location) {
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
            TbUtils.fillList(response, vm.majors);
        };
        
        function getSectionsSuccess(response) {
            TbUtils.fillList(response, vm.sections);
            vm.project.SectionId = vm.sections[0].Id;
        };
        
        function getMajorsFail(response) {
            console.log(response);
            TbUtils.displayNotification('error', 'Error',
                                'Hay un problema con el servidor. No se ha podido obtener las carreras disponibles.');
        };
        
        function getSectionsFail(response) {
            console.log(response);
            TbUtils.displayNotification('error', 'Error',
                                'Hay un problema con el servidor. No se ha podido obtener las secciones disponibles.');
        };
        
        function submitProjectSuccess() {
            $location.path('/proyectos');
        };
        
        function submitProjectFail() {
            TbUtils.displayNotification('error', 'Error', 'No se ha podido crear el proyecto.');
        };
    }
})();