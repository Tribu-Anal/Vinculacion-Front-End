'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('solicitudesController', ['$scope','solicitudesEndPoints',function($scope,solicitudesEndPoints) {
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
					if(data.data[i].Major!==null){
						ctrl.tablaSolicitudes.cuerpo.push(
							crearNuevoElementoParaLaTabla(data.data[i].Id, data.data[i].Name, data.data[i].AccountId , data.data[i].Major.Name,data.data[i].Email)
						);
					}
				}
			}
		});

		function crearNuevoElementoParaLaTabla(id, nombreAlumno, numeroCuenta, carrera, correo) {
			var nuevoElemento = {
				acciones:[
					{
						nombre: 'Aceptar',
						click: function(){
                            let index = ctrl.tablaSolicitudes.cuerpo.indexOf(nuevoElemento);
							let objetoARegistrar = {
								AccountId: numeroCuenta,
								Message: 'Fue aceptado',
                                id:id
							}
							solicitudesEndPoints.Aceptar_SolicitudDeAlumno(objetoARegistrar,function(data){
								ctrl.tablaSolicitudes.cuerpo.splice(index,1);
								
							});
						}
					},
					{
						nombre: 'Rechazar',
						click: function(){
							let index = ctrl.tablaSolicitudes.cuerpo.indexOf(nuevoElemento);
							let objetoARegistrar = {
								AccountId: numeroCuenta,
								Message: 'Con que autoridad quiere registrarse... Rechazado!'
							}
							solicitudesEndPoints.rechazarAceptar_SolicitudDeAlumno(objetoARegistrar,'Rejected',function(data){
								ctrl.tablaSolicitudes.cuerpo.splice(index,1);
								
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