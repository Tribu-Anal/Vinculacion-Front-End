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

		// solicitudesEndPoints.obtenerAlumnosConSolicitudesPendientes(function(data){
		// 	if(data.data.length>0){
		// 		for (let i = 0; i <data.data.length; i++) {
		// 			if(data.data[i].Major!==null){
						ctrl.tablaSolicitudes.cuerpo.push(
							crearNuevoElementoParaLaTabla(1,'Daniel',2323,'Sistemas','@unitec.edu'/*data.data[i].Id, data.data[i].Name, data.data[i].AccountId , data.data[i].Major.Name,data.data[i].Email*/)
						);
		// 			}
		// 		}
		// 	}
		// });

		function crearNuevoElementoParaLaTabla(id, nombreAlumno, numeroCuenta, carrera, correo) {
			var nuevoElemento = {
				acciones:[
					{
						nombre: 'Aceptar',
						icon:'glyphicon glyphicon-ok',
						click: function(){
							var dialog = ngDialog.open({
							template: 'js/directives/dialog/dialog.view.html',
							controller: ['$scope', function($scope){
								$scope.buttons = [
								{
									text: 'Aceptar',
									click: function(){
										console.log()
										// element1.content[2] = $scope.fields[0].value;
										// element1.content[3] = $scope.fields[1].value;
										let object = {
                                              numeroCuenta: $scope.alumno.numeroCuenta,
                                              mensaje:$scope.field.value
                                        }
                                        console.log(object);
                                        // ctrl.updateElement(object1, element1.id, type,array);
										dialog.close();
									}
								},{
									text: 'Cancelar',
									click: function(){
										console.log('Cancelar');
										dialog.close();
									}
								}
								];
							   $scope.template = 'templates/solicitudes.dialog.html';
							   $scope.title = 'Aprobar Solicitud';
							   $scope.field = {label: 'Mensaje', value: 'Su solicitud ha sido aprobada, ya puede comenzar a registrar sus horas de vinculacion social'};
							   $scope.alumno ={nombre: nombreAlumno, numeroCuenta: numeroCuenta};
							}]
						});
							
							// console.log('acceptar');
       //                      let index = ctrl.tablaSolicitudes.cuerpo.indexOf(nuevoElemento);
							// let objetoARegistrar = {
							// 	AccountId: numeroCuenta,
							// 	Message: 'Fue aceptado',
       //                          id:id
							// }
							// solicitudesEndPoints.Aceptar_SolicitudDeAlumno(objetoARegistrar,function(data){
							// 	ctrl.tablaSolicitudes.cuerpo.splice(index,1);
								
							// });
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