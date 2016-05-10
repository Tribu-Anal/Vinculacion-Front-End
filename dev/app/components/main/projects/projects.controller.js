(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects', 'TbUtils'];

    function ProjectsController (projects, TbUtils) {
        var vm = this;
        
        vm.projects = [];
        
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