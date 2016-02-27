var app = angular.module('VinculacionApp');

app.service('registro', function($http) {
    var direccion = 'http://movieapp-sitepointdemos.rhcloud.com/api/movies';//Direccion temporal
    
    this.registroAlumno = function(data) {
        return $http.post(direccion, data);
    }
    
});