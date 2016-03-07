var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['proyectos', 'toaster', '$stateParams', function(proyectos, toaster, $stateParams) {
    var controlador = this;
    
    controlador.proyectos = [];
    controlador.idProyecto = $stateParams.projectId;
    
    proyectos.getProyectos(controlador.idProyecto, function(response) {
        console.log(response);
        console.log($stateParams.projectId);
        for(var obj in response.data) {
            controlador.proyectos.push(response.data[obj])
        }
    }, function(response) {
        toaster.pop({type: 'error', title: 'Error', body: 'No se ha podido obtener los proyectos deseados.'});
    });
}]);