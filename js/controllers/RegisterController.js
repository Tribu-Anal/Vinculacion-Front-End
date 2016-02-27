var app = angular.module('VinculacionApp');

app.controller('RegistroCtrl', ['$scope', 'registro', function($scope, registro) {
    $scope.correo;
    $scope.password;
    $scope.numCuenta;
    $scope.nombre;
    $scope.campus;
    $scope.idCarrera;
    $scope.carrera;
    
    $scope.registrarAlumno = function() {
        registro.registroAlumno({
            IdNumber: $scope.numCuenta,
            Name: $scope.nombre,
            Password: $scope.password,
            Campus: $scope.campus,
            Email: $scope.correo,
            Major: {
                MajorId : $scope.idCarrera,
                Name: $scope.carrera
            }
    }).success(function(response) {
            console.log(response);
            console.log("Alumno registrado");
        })
        console.log("Registrado");
    }
    
    $scope.validarCorreo = function() {
        return $scope.correo.indexOf("@unitec.edu", $scope.correo.length - 11) >= 0 ? true : false;
    }
}]);