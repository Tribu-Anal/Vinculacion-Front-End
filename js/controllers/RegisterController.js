var app = angular.module('VinculacionApp');

app.controller('RegistroCtrl', ['$scope', 'registro', function($scope, registro) {
    $scope.numCuenta;
    $scope.password;
    
    $scope.registrarAlumno = function() {
        registro.registroAlumno({numCuenta: $scope.numCuenta, password: $scope.password}).success(function(response) {
            console.log(response);
            console.log("Alumno registrado");
        })
    }
}]);