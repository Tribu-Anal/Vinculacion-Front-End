(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectFormController', ProjectFormController);

    ProjectFormController.$inject = [ '$state', '$stateParams',
                                      'projects', 'sections', 
                                      'majors', 'toaster', 
                                      'TbUtils', '$location'];

    function ProjectFormController ($state, $stateParams, 
                                    projects, sections, 
                                    majors, toaster, 
                                    TbUtils, $location) {
        var vm = this;

        vm.edit = $state.current.name.includes('edit');
        vm.formLegend = vm.edit ? "Editar Proyecto" : "Nuevo Proyecto";

        vm.sections = [];
        vm.majors = [];
        vm.project = setProject();

        vm.majorsLoading = true;
        vm.sectionsLoading = true;

        vm.submitProject = submitProject;
        vm.checkboxListItemClicked = checkboxListItemClicked;
        vm.majorsAndStatusValid = majorsAndStatusValid;

        var editId = vm.edit ? vm.project.Id : -1;
        
        majors.getMajors(getMajorsSuccess, getMajorsFail);
        sections.getSections(getSectionsSuccess, getSectionsFail);

        function setProject () {
            return $stateParams.project ? 
                   JSON.parse($stateParams.project) : 
                   {
                    ProjectId: '',
                    Name: '',
                    Description: '',
                    Cost: 0.0,
                    MajorIds: [],
                    SectionIds: [],
                    BeneficiariesAlias: '',
                    BeneficiariesQuantity: 0
                    };
        }
        
        function submitProject() {
            if (vm.edit) {
                removeProjectNonAPIProperties();
                updateProject();
            }
            else
                postNewProject();
        }

        function removeProjectNonAPIProperties () {
            delete vm.project.$$hashKey;
            delete vm.project.Id;
            delete vm.project.IsDeleted;
            console.log(vm.project);
        }

        function updateProject () {
            projects.updateProject(editId, vm.project, 
                updateSuccess, updateFailure);
        }

        function updateSuccess () {
            $location.path('/proyectos');
            TbUtils.displayNotification('success', 'Proyecto Actualizado', 
                'Se ha actualizado exitosamente el nuevo proyecto.');
        }

        function updateFailure () {
            TbUtils.displayNotification('error', 'Error', 
                'No se pudo actualizar el proyecto.');
        }

        function postNewProject () {
            projects.postProject(vm.project, 
                submitProjectSuccess, submitProjectFail);
        }

        function checkboxListItemClicked (inputValue, listItemModel, listModel) {
            if (inputValue)
                listModel.push(listItemModel);
            else
                TbUtils.removeItemFromList(listItemModel, listModel);
        }
        
        function majorsAndStatusValid() {
            return vm.project.MajorIds.length > 0 && 
                   vm.project.SectionIds.length > 0;
        }
        
        function getMajorsSuccess(response) {
            TbUtils.fillList(response, vm.majors);

            vm.majorsLoading = false;
        }
        
        function getSectionsSuccess(response) {
            TbUtils.fillList(response, vm.sections);
            
            vm.sectionsLoading = false;
        }
        
        function getMajorsFail(response) {
            console.log(response);
            TbUtils.displayNotification('error', 'Error',
                                'Hay un problema con el servidor.' + 
                                ' No se ha podido obtener las carreras disponibles.');
            vm.majorsLoading = false;
        }
        
        function getSectionsFail(response) {
            console.log(response);
            TbUtils.displayNotification('error', 'Error',
                                'Hay un problema con el servidor. No se ha podido obtener las secciones disponibles.');
            vm.sectionsLoading = false;
        }
        
        function submitProjectSuccess() {
            $location.path('/proyectos');
            TbUtils.displayNotification('success', 'Proyecto Creado', 
                'Se ha creado exitosamente el nuevo proyecto.');
        }
        
        function submitProjectFail() {
            TbUtils.displayNotification('error', 'Error', 
                'No se ha podido crear el proyecto.');
        }
    }
})();
