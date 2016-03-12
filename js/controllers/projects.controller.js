(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['proyectos', 'toaster'];

    function ProjectsController (proyectos, toaster) {
        var vm = this;
        
        vm.projects = [];
        
        proyectos.getProyectos( vm.projectId, 
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