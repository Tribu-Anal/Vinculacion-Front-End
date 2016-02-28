'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('solicitudesController', ['$scope',function($scope) {
		var ctrl = this;

		ctrl.tablaSolicitudes={
			encabezado: [
				'Nombre del Alumno',
				'Número de Cuenta',
				'Carrera',
				'Correo Electronico'
			],
			cuerpo:[{
					acciones:[
						{nombre: 'Aceptar', click:function(){console.log('edit');}},
						{nombre: 'Rechazar', click:function(){console.log('delete');}}
					],
					contenido:[
						'testing 1',
						'testing 2',
						'testing 3',
						'teting 4'
					]
				},{
					acciones:[],
					contenido:[
						'testing 12',
						'testing 22',
						'testing 32',
						'testing 42'
					]
				}]
		};

		function crearNuevoElementoParaLaTabla(id, nombreAlumno, numeroCuenta, carrera, correo) {
			var nuevoElemento = {
				acciones:[
					{
						nombre: 'Aceptar',
						click: function(){

						}
					},
					{
						nombre: 'Rechazar',
						click: function(){
							
						}
					}
				],
				contenido:[
					nombreAlumno,
					numeroCuenta,
					carrera,
					correo
				],
				id: id
			};
			return nuevoElemento;
		}
		   
}]);