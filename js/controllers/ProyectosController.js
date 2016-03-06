var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['proyectos', 'toaster', function(proyectos, toaster) {
    var controlador = this;
    
    controlador.proyectos = [];
    controlador.idProyecto = "";
    
    proyectos.getProyectos(controlador.idProyecto, function(response) {
        console.log(response.data);
        controlador.proyectos.push(response.data);
    }, function(response) {
        toaster.pop({type: 'error', title: 'Error', body: 'No se ha podido obtener el proyectos deseados.'});
    });
}]);