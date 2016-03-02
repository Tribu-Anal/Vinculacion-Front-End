var app = angular.module('VinculacionApp');

app.service('registro', function($http) {
    var direccion = 'http://fiasps.unitec.edu:8085/api/Students';//http://fiasps.unitec.edu:8085/api/Students
    
    this.registroAlumno = function(data) {
        return $http.post(direccion, data);
    }
    
});