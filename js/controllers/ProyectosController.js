var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['proyectos', function(proyectos) {
    var controlador = this;
    
    controlador.proyectos = [];
    
    proyectos.getProyectos(controlador.numCuenta, function(response) {        
        console.log(response.data);
        controlador.proyectos.push(response.data);
    });
    
//    proyectos.getProyectos(controlador.numCuenta, function(response) {        
//        for(var obj in response.data) {
//            for(var proyecto in response.data[obj]) {
//                console.log(response.data[obj][proyecto]);
//                controlador.proyectos.push(response.data[obj][proyecto])
//            }
//        }
//    });
}]);