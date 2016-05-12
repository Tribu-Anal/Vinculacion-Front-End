(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects', 'TbUtils', 'ModalService'];

    function ProjectsController (projects, TbUtils, ModalService) {
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
        vm.preventGeneralLoading = preventGeneralLoading;
        vm.removeProjectClicked = removeProjectClicked;

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
            projects.deleteProject(deleteProject.Id, 
                removeProjectSucces, removeProjectFail);
        }

        function removeProjectSucces () {
            vm.projects.splice(deleteIndex, 1);
        }

        function removeProjectFail () {
            TbUtils.displayNotification('error', 'Error', 
              'No se pudo borrar el proyecto.');
        }

        projects.getProjects(getProjectsSuccess, getProjectsFail);
        
        function getProjectsSuccess(response) {
            console.log(response);
            TbUtils.fillList(response, vm.projects);

            vm.projectsLoading = false;
        }
        
        function getProjectsFail() {
            TbUtils.displayNotification('error', 'Error', 
              'No se ha podido obtener los proyectos deseados.');

            vm.projectsLoading = false;
        }
    }
})();