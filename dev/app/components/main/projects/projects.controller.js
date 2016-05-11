(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects', 'TbUtils', '$state'];

    function ProjectsController (projects, TbUtils, $state) {
        var vm = this;
        var deleteIndex = -1;
        
        vm.projects = [];
        vm.removeProjectClicked = removeProjectClicked;
        vm.goToEdit = goToEdit;

        function removeProjectClicked (project, index) {
            if (confirm("Esta seguro de borrar el proyecto: " + 
                project.Name + "?"))
            removeProject(project, index);
        }

        function removeProject (project, index) {
            deleteIndex = index;

            projects.deleteProject(project.Id, 
                removeProjectSucces, removeProjectFail);
        }

        function removeProjectSucces () {
            vm.projects.splice(deleteIndex, 1);
        }

        function removeProjectFail () {
            toaster.pop(
                {
                    type: 'error', 
                    title: 'Error', 
                    body: 'No se pudo borrar el proyecto.'
                }
            );
        }

        function goToEdit (project) {
            $state.go('dashboard.editproject', { project: JSON.stringify(project) });
        }
        
        projects.getProjects(getProjectsSuccess, getProjectsFail);
        
        function getProjectsSuccess(response) {
            TbUtils.fillList(response, vm.projects);
        };
        
        function getProjectsFail() {
            TbUtils.displayNotification('error', 'Error', 'No se ha podido obtener los proyectos deseados.');
        };
    }
})();