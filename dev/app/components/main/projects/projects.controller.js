(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects', 'toaster'];

    function ProjectsController (projects, toaster) {
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

            projects.deleteProject(1000, 
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
        
        projects.getProjects( 
            function(response) {
                console.log(response);
                for(var obj in response.data) {
                    vm.projects.push(response.data[obj])
                }
            }, 
            function(response) {
                toaster.pop(
                    {
                        type: 'error', 
                        title: 'Error', 
                        body: 'No se ha podido obtener los proyectos deseados.'
                    }
                );
            }
        );
    }

})();