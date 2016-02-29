'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('solicitudesController', ['$scope', 'solicitudesEndPoints',function($scope,solicitudesEndPoints) {
		var ctrl = this;

		ctrl.tablaSolicitudes={
			encabezado: [
				'Nombre del Alumno',
				'Número de Cuenta',
				'Carrera',
				'Correo Electronico'
			],
			cuerpo:[]
		};

		solicitudesEndPoints.obtenerAlumnosConSolicitudesPendientes(function(data){
			if(data.data.length>0){
				for (let i = 0; i <data.data.length; i++) {
					ctrl.tablaSolicitudes.cuerpo.push(
						crearNuevoElementoParaLaTabla(data.data[i].Id, data.data[i].Name, data.data[i].IdNumber , data.data[i].Major.Name,data.data[i].Email)
					);
				}
			}
		});

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
							let index = ctrl.tablaSolicitudes.cuerpo.indexOf(nuevoElemento);
							let objetoARegistrar = {
								NumberId: numeroCuenta
							}
							solicitudesEndPoints.rechazarSolicitudDeAlumno(objetoARegistrar,function(data){
								//mostrar mensaje de exito o error
								//exitoso:
								//ctrl.tablaSolicitudes.cuerpo.splice(index,1);
							});
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