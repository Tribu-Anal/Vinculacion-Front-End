var app = angular.module('VinculacionApp');

app.service('registro', function($http) {
    var direccion = 'http://jsonplaceholder.typicode.com/posts';//Direccion temporal
    
    this.registroAlumno = function(data) {
        return $http.post(direccion, data);
    }
    
});