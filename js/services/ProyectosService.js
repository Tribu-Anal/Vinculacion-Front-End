var app = angular.module('VinculacionApp');

app.service('proyectos', function($http) {
   var direccion = 'http://fiasps.unitec.edu:8085/api/Projects';
   
   this.getProyectos = function(idProyecto, successCallback, errorCallback) {
       if(idProyecto === undefined)
           $http.get(direccion).then(successCallback, errorCallback);
       
       else
           $http.get(direccion + "/" + idProyecto).then(successCallback, errorCallback);
   }
})