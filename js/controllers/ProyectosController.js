'use strict';
var app = angular.module('VinculacionApp');

app.controller('ProyectosCtrl', ['proyectos', 'toaster', '$stateParams', 'ngDialog', function(proyectos, toaster, $stateParams, ngDialog) {
    var controlador = this;
    
    controlador.proyectos = [];
    controlador.participantes = [];
    controlador.idProyecto = $stateParams.projectId;
    
    proyectos.getProyectos(controlador.idProyecto, function(response) {
        console.log(response);
        console.log($stateParams.projectId);
        for(var obj in response.data) {
            controlador.proyectos.push(response.data[obj])
        }
    }, function(response) {
        toaster.pop({type: 'error', title: 'Error', body: 'No se ha podido obtener los proyectos deseados.'});
    });

    function getParticipantes(){
        controlador.participantes.push({nombre: 'Daniel Zelaya', numeroCuenta:232223212});
        controlador.participantes.push({nombre: 'Kelvin Chinchilla', numeroCuenta:454323212});
        controlador.participantes.push({nombre: 'Alejandro Ferrera', numeroCuenta:23653212});
        controlador.participantes.push({nombre: 'Daniel Perez', numeroCuenta:2334553222});
    };

    controlador.editarHoras = function(participante){
        var dialog = ngDialog.open({
                template: 'js/directives/dialog/dialog.view.html',
                controller: ['$scope', function($scope){
                    $scope.buttons = [
                        {
                            text: 'Aceptar',
                            click: function(){
                                let objectoAlumno = {
                                  AccountId:$scope.alumno.numeroCuenta,
                                  amount: $scope.field.value 
                                };
                                //Llamr endpoint para guardar 
                                dialog.close();
                            }
                        },{
                            text: 'Cancelar',
                            click: function(){
                                dialog.close();
                            }
                        }
                    ];
                    $scope.template = 'templates/horas.dialog.html';
                    $scope.title = 'Adicionar Horas';
                    $scope.field = {label: 'Cantidad de Horas', value: 0, min: 0, max:30};
                    $scope.alumno ={nombre: participante.nombre, numeroCuenta: participante.numeroCuenta};
                }]
            });
    }
    getParticipantes();
}]);