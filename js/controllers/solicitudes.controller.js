'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('solicitudesController', ['$scope','solicitudesEndPoints', 'toaster',function($scope,solicitudesEndPoints, toaster) {
		var ctrl = this;

		ctrl.tablaSolicitudes={
			encabezado: [
				'Numero de Cuenta',
				'Nombre',
				'Carrera',
				'Correo Electronico'
            ],
			cuerpo:[],
			acciones:true
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
						icon:'glyphicon glyphicon-ok',
						click: function(){
							console.log('acceptar');
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
						nombre: 'Rechazar Test',
						icon:'glyphicon glyphicon-remove',
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
					numeroCuenta,
					nombreAlumno,
					carrera,
					correo
				],
				id: id
			};
			return nuevoElemento;
		}
}]);