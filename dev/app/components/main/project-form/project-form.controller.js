(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectFormController', ProjectFormController);

    ProjectFormController.$inject = [ '$state', '$stateParams', 'projects', 'sections', 'majors', 'toaster', 'TbUtils', '$location'];

    function ProjectFormController ($state, $stateParams, projects, sections, majors, toaster, TbUtils, $location) {
        var vm = this;

        vm.edit = $state.current.name.includes('edit');
        vm.formLegend = vm.edit ? "Editar Proyecto" : "Nuevo Proyecto";

        vm.sections = [];
        vm.majors = [];
        vm.project = setProject();

        vm.submitProject = submitProject;
        vm.MajorsCheckboxClicked = MajorsCheckboxClicked;
        vm.SectionsCheckboxClicked = SectionsCheckboxClicked;
        vm.majorsAndStatusValid = majorsAndStatusValid;

        var editId = vm.edit ? vm.project.Id : -1;
        // vm.project.MajorIds = [];
        // vm.project.SectionId = 0;
        
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
                    SectionId: 0,
                    BenificiariesAlias: '',
                    BenificiariesQuantity: 0
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
        }

        function updateProject () {
            projects.updateProject(editId, vm.project, 
                updateSuccess, updateFailure);
        }

        function updateSuccess () {
            $location.path('/proyectos');
        }

        function updateFailure () {
            TbUtils.displayNotification('error', 'Error', 
                'No se pudo actualizar el proyecto.');
        }

        function postNewProject () {
            projects.postProject(vm.project, 
                submitProjectSuccess, submitProjectFail);
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
        
        function majorsAndStatusValid() {
            return vm.project.MajorIds.length > 0 && 
                   vm.project.SectionId !== 0;
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
