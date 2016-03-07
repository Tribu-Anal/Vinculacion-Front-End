'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('solicitudesController', ['$scope','solicitudesEndPoints', 'toaster','ngDialog',function($scope,solicitudesEndPoints, toaster, ngDialog) {
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

		function openDialog(tituloDialog, mensaje,id, nombreAlumno, numeroCuenta, callback){
			var dialog = ngDialog.open({
				template: 'js/directives/dialog/dialog.view.html',
				controller: ['$scope', function($scope){
					$scope.buttons = [
						{
							text: 'Aceptar',
							click: function(){
								let objectoCallback = {};
								objectoCallback.AccountId=$scope.alumno.numeroCuenta;
								objectoCallback.Message=$scope.field.value;
								objectoCallback.id=id;
								dialog.close();
								if((callback)&&(typeof callback==='function')){
									callback(objectoCallback);
								}
							}
						},{
							text: 'Cancelar',
							click: function(){
								dialog.close();
							}
						}
					];
					$scope.template = 'templates/solicitudes.dialog.html';
					$scope.title = tituloDialog;
					$scope.field = {label: 'Mensaje', value: mensaje};
					$scope.alumno ={nombre: nombreAlumno, numeroCuenta: numeroCuenta};
				}]
			});
		};

		function crearNuevoElementoParaLaTabla(id, nombreAlumno, numeroCuenta, carrera, correo) {
			var nuevoElemento = {
				acciones:[
					{
						nombre: 'Aceptar',
						icon:'glyphicon glyphicon-ok',
						click: function(){
							let index = ctrl.tablaSolicitudes.cuerpo.indexOf(nuevoElemento);
							let mensaje = 'Su solicitud ha sido aprobada, ya puede comenzar a registrar sus horas de vinculacion social';
							let objectoCallback = openDialog('Aprobar Solicitud', mensaje, id,nombreAlumno, numeroCuenta,function(data){
								//console.log(data);
								 solicitudesEndPoints.Aceptar_SolicitudDeAlumno(data, function(data){
								 ctrl.tablaSolicitudes.cuerpo.splice(index,1);
								
								 });
							});
						}
					},
					{
						nombre: 'Rechazar',
						icon:'glyphicon glyphicon-remove',
						click: function(){
							let index = ctrl.tablaSolicitudes.cuerpo.indexOf(nuevoElemento);
							let mensaje = 'Con que autoridad quiere registrarse! ';
							let objectoCallback = openDialog('Rechazar Solicitud', mensaje, id,nombreAlumno, numeroCuenta,function(data){
								 //console.log(data);
								 solicitudesEndPoints.Rechazar_SolicitudDeAlumno(data, mensaje, function(data){
								 ctrl.tablaSolicitudes.cuerpo.splice(index,1);
								
								 });
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