var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['proyectos', function(proyectos) {
    var controlador = this;
    
    controlador.proyectos = [];
    
    proyectos.getProyectos(controlador.numCuenta, function(response) {        
        console.log(response.data);
        controlador.proyectos.push(response.data);
    });
}]);