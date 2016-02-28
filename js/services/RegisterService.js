var app = angular.module('VinculacionApp');

app.service('registro', function($http) {
<<<<<<< HEAD
    var direccion = ' http://proyecto-vinculacion.getsandbox.com/users';//Direccion temporal
=======
    var direccion = 'http://proyecto-vinculacion.getsandbox.com/users';//http://vinculacionbackend.apphb.com/api/Students
>>>>>>> 9128dd1ede7408ae6475b2fd6fe91eefbd00e7be
    
    this.registroAlumno = function(data) {
        return $http.post(direccion, data);
    }
    
});