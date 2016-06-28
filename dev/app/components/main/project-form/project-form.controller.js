(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectFormController', ProjectFormController);

    ProjectFormController.$inject = [ '$rootScope', '$state', '$stateParams',
                                      'projects', 'sections', 
                                      'majors', 'toaster', 
                                      'TbUtils', '$location'];

    function ProjectFormController ($rootScope, $state, $stateParams, 
                                    projects, sections, 
                                    majors, toaster, 
                                    TbUtils, $location) {
        if ($rootScope.Role !== 'Admin') $state.go('dashboard.projects');

        var vm = this;

        vm.edit = $state.current.name.includes('edit');
        vm.formLegend = vm.edit ? "Editar Proyecto" : "Nuevo Proyecto";

        vm.sections = [];
        vm.majors = [];
        vm.project = setProject();

        vm.majorsLoading = true;
        vm.sectionsLoading = true;
        vm.submitting = false;

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
                    SectionIds: [0],
                    BeneficiarieOrganization: '',
                    BeneficiarieGroups: '',
                    BeneficiariesQuantity: 0
                    };
        }
        
        function submitProject() {
            vm.submitting = true;

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
        }

        function updateProject () {
            projects.updateProject(editId, vm.project, 
                updateSuccess, updateFailure);
        }

        function updateSuccess () {
            vm.submitting = false;

            TbUtils.preventGeneralLoading();
            $location.path('/proyectos');
            TbUtils.displayNotification('success', 'Proyecto Actualizado', 
                'Se ha actualizado exitosamente el nuevo proyecto.');
        }

        function updateFailure (response) {
            vm.submitting = false;
            TbUtils.showErrorMessage('error', response,
                                     'No se pudo actualizar el proyecto.',
                                     'Error');
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
            return vm.project.MajorIds.length > 0;
        }
        
        function getMajorsSuccess(response) {
            TbUtils.fillListWithResponseData(response.data, vm.majors);

            vm.majorsLoading = false;
        }
        
        function getSectionsSuccess(response) {
            TbUtils.fillListWithResponseData(response.data, vm.sections);
            
            vm.sectionsLoading = false;
        }
        
        function getMajorsFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response,
                                     'Hay un problema con el servidor.' + 
                                     ' No se ha podido obtener las carreras disponibles.',
                                     'Error');
            vm.majorsLoading = false;
        }
        
        function getSectionsFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response,
                                     'Hay un problema con el servidor. No se ha podido obtener las secciones disponibles.',
                                     'Error');
            vm.sectionsLoading = false;
        }
        
        function submitProjectSuccess() {
            vm.submitting = false;

            TbUtils.preventGeneralLoading();
            $location.path('/proyectos');
            TbUtils.displayNotification('success', 'Proyecto Creado', 
                'Se ha creado exitosamente el nuevo proyecto.');
        }
        
        function submitProjectFail(response) {
            vm.submitting = false;
            TbUtils.showErrorMessage('error', response,
                                     'No se ha podido crear el proyecto.',
                                     'Error');
        }
    }
})();
