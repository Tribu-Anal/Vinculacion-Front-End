(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects', 'TbUtils', '$state', 'ModalService',
                                    '$rootScope','authentication'];

    function ProjectsController (projects, TbUtils, $state, ModalService,
                                $rootScope, authentication) {
        var vm = this;

        var deleteIndex = -1;
        var deleteProject = {};
        var confirmDeleteModal = {
          templateUrl: 'templates/components/main/projects/' +
                       'confirm-delete/confirm-delete.html',
          controller: 'ConfirmDeleteController'
        };
        
        vm.projects = [];
        vm.projectsLoading = true;
        vm.deletingProject = [];
        vm.preventGeneralLoading = preventGeneralLoading;
        vm.removeProjectClicked = removeProjectClicked;
        vm.goToEdit = goToEdit;

        vm.reportButton = {
            show: $rootScope.Role === 'Student',
            onClick: loadReport,
            icon: 'glyphicon-file'
        };

        function preventGeneralLoading () {
            TbUtils.preventGeneralLoading();
        }

        function removeProjectClicked (project, index) {
            deleteProject = project;
            deleteIndex = index;
            
            ModalService.showModal(confirmDeleteModal)
              .then(modalResolve);
        }

        function modalResolve (modal) {
          modal.element.modal();
          modal.close.then(modalClose);
        }

        function modalClose (result) {
            if (result === true) 
              removeProject();
        }

        function removeProject () {
            vm.deletingProject[deleteIndex] = true;

            projects.deleteProject(deleteProject.Id, 
                removeProjectSucces, removeProjectFail);
        }

        function removeProjectSucces () {
            vm.projects.splice(deleteIndex, 1);
            vm.deletingProject.splice(deleteIndex, 1);
        }

        function removeProjectFail (response) {
            TbUtils.showErrorMessage('error', response,
                                     'No se pudo borrar el proyecto.',
                                     'Error');

            vm.deletingProject[deleteIndex] = false;
        }

        projects.getProjects(getProjectsSuccess, getProjectsFail);

        function goToEdit (project) {
            preventGeneralLoading();
            $state.go('dashboard.editproject', { project: JSON.stringify(project) });
        }
        
        function getProjectsSuccess(response) {
            TbUtils.fillListWithResponseData(response.data, vm.projects);
            TbUtils.initArrayToValue(vm.deletingProject, false, 
                                     vm.projects.length);

            vm.projectsLoading = false;
        }
        
        function getProjectsFail(response) {
            TbUtils.showErrorMessage('error', response,
                                     'No se ha podido obtener los proyectos deseados.',
                                     'Error');

            vm.projectsLoading = false;
        }

        function successAccountId(response){
            response = response.data;
            let params = {
                templateUrl: 'reports/hours-by-student/hours-by-student.html',
                previousState: 'dashboard.home',
                previousStateParams: { },
                reportParams: {
                    AccountId: response.AccountId,
                    Campus: response.Campus,
                    Major: response.Major.Name,
                    Name: response.Name
                },
                showPrintButton: false
            }
            TbUtils.preventGeneralLoading();
            $state.go('dashboard.printarea', {
                params: params
            });
        }
        function failAccountId(){
            TbUtils.displayNotification('error', 'Error',
                'No se pudo cargar el reporte correctamente.');
        }
        function loadReport(){
            let email = $rootScope.Session;
            let obj = {
                Email: email
            }
            authentication.AccountId(obj,
                successAccountId, failAccountId)
        }
    }
})();