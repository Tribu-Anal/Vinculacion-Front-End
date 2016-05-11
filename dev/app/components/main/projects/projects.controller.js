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
          templateUrl: 'templates/shared/TB-Modals/Confirm/confirm.html',
          controller: 'ConfirmController'
        };
        
        vm.projects = [];
        vm.removeProjectClicked = removeProjectClicked;

        projects.getProjects(getProjectsSuccess, getProjectsFail);

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
        
        function getProjectsSuccess(response) {
            console.log(response);
            TbUtils.fillList(response, vm.projects);
        }
        
        function getProjectsFail() {
            TbUtils.displayNotification('error', 'Error', 
              'No se ha podido obtener los proyectos deseados.');
        }
    }
})();