var app = angular.module('VinculacionApp');

app.service('proyectos', function($http) {
   var direccion = 'http://fiasps.unitec.edu:8085/api/Projects/1';//http://fiasps.unitec.edu:8085/api/Proyects
   
   this.getProyectos = function(numCuenta, callback) {
       //Mas adelante se utilizara el numero de cuenta para obtener los proyectos de un alumno/docente en especifico.
      //$http.get(direccion + '/' + numCuenta).then(callback);
       $http.get(direccion).then(callback);
   }
})