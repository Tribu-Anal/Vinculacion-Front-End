var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['proyectos', 'toaster', function(proyectos, toaster) {
    var controlador = this;
    
    controlador.proyectos = [];
    controlador.idProyecto = "";
    
    proyectos.getProyectos(controlador.idProyecto, function(response) {
        console.log(response.data);
        controlador.proyectos.push(response.data);
    }, function(response) {
        toaster.pop({type: 'error', title: 'Error', body: 'No se ha podido obtener los proyectos deseados.'});
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