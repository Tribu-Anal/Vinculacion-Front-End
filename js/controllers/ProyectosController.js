var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['$scope', 'proyectos', function($scope, proyectos) {
    $scope.proyectos = [];
    
    proyectos.getProyectos($scope.numCuenta, function(response) {
        for(var obj in response.data) {
            for(var proyecto in response.data[obj])
                $scope.proyectos.push(response.data[obj][proyecto]);
        }
    });
}]);