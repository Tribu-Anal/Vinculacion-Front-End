(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects', 'TbUtils'];

    function ProjectsController (projects, TbUtils) {
        var vm = this;
        
        vm.projects = [];
        vm.removeProjectClicked = removeProjectClicked;

        function removeProjectClicked (project, index) {
            if (confirm("Esta seguro de borrar el proyecto: " + 
                project.Name + "?"))
            removeProject(project, index);
        }

        function removeProject (project, index) {
            vm.projects.splice(index, 1);

            projects.deleteProject(project.Id, 
                removeProjectSucces, removeProjectFail);
        }

        function removeProjectSucces () {
            console.log("Success");
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
        
        projects.getProjects(getProjectsSuccess, getProjectsFail);
        
        function getProjectsSuccess(response) {
            console.log(response);
            TbUtils.fillList(response, vm.projects);
        };
        
        function getProjectsFail() {
            TbUtils.displayNotification('error', 'Error', 'No se ha podido obtener los proyectos deseados.');
        };
    }
})();