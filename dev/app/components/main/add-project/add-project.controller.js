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
            SectionId: 0,
            BenificiariesAlias: '',
            BenificiariesQuantity: 0
        }
        
        vm.submitProject = submitProject;
        vm.MajorsCheckboxClicked = MajorsCheckboxClicked;
        vm.SectionsCheckboxClicked = SectionsCheckboxClicked;
        
        majors.getMajors(getMajorsSuccess, getMajorsFail);
        sections.getSections(getSectionsSuccess, getSectionsFail);
        
        function submitProject() {
            if(validateMajorsSectionStatus())
                projects.postProject(vm.project, submitProjectSuccess, submitProjectFail);
        }
        
        function MajorsCheckboxClicked (inputValue, id) {
            console.log(id);
            if (inputValue) {
                vm.project.MajorIds.push(id);
            }
            else {
                for (let i = 0; i < vm.project.MajorIds.length; i++) {
                    if (vm.project.MajorIds[i] === id) {
                        vm.project.MajorIds.splice(i, 1);
                    }
                }
            }
            console.log(inputValue, vm.project.MajorIds);
        }
        
        function SectionsCheckboxClicked(inputValue, id) {
            console.log(id);
            if (inputValue) {
                vm.project.SectionId = id;
            }
            else {
                vm.project.SectionId = 0;
            }
            console.log(inputValue, vm.project.SectionId);
        }
        
        function validateMajorsSectionStatus() {
            if(vm.project.MajorIds.length > 0 && vm.project.SectionId !== 0)
                return true;
            
            return false;
        }
        
        function getMajorsSuccess(response) {
            TbUtils.fillList(response, vm.majors);
        };
        
        function getSectionsSuccess(response) {
            TbUtils.fillList(response, vm.sections);
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