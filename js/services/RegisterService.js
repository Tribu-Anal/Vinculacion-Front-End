var app = angular.module('VinculacionApp');

app.service('registro', function($http) {
    var direccion = 'http://proyecto-vinculacion.getsandbox.com/users';//Direccion temporal
    
    this.registroAlumno = function(data) {
        return $http.post(direccion, data);
    }
    
});