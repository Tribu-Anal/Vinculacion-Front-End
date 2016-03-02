    'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('horasController', ['$scope','horasEndPoints',function($scope, horasEndPoints) {
		var ctrl = this;
		ctrl.secciones={
			opciones:[
				{id:1, nombre: 'INF405'}
			],
			opcionSeleccionada:{}
		};
		ctrl.proyectos={
			opciones:[
				{id:1, nombre: 'Proyecto de Vinculacion Unitec'}
			],
			opcionSeleccionada:{}
		};
		ctrl.horas = {
			min: '0',
			max: '20',
			valor: ''
		};
		ctrl.alumnos={
			opciones:[],
			opcionSeleccionada:{}
		};
		horasEndPoints.obtenerAlumnosPorSeccion(1,function(data){
			if(data.data.length>0){
				for (let i = 0; i <data.data.length; i++) {
					ctrl.alumnos.opciones.push(
						{
							id:data.data[i].AccountId,
							nombre: data.data[i].Name + " " + data.data[i].AccountId
						}
					);
				}
			}
		});
		function validarCampos(opcionSeccion, opcionProyecto, opcionAlumno, horaValor){
			let valido = true;
			valido = valido&&opcionSeccion.id?true:false;
			valido = valido&&opcionProyecto.id?true:false;
			valido = valido&&opcionAlumno.id?true:false;
			valido = valido&&horaValor?true:false;
			return valido;
		};   
		ctrl.registrarHoras = function(){
			if(!validarCampos(ctrl.secciones.opcionSeleccionada, ctrl.proyectos.opcionSeleccionada, ctrl.alumnos.opcionSeleccionada, ctrl.horas.valor)){
				return; 
			}
			let objetoARegistrar = {
				AccountId: ctrl.alumnos.opcionSeleccionada.id,
				SectionId: ctrl.secciones.opcionSeleccionada.id,
				ProjectId: ctrl.proyectos.opcionSeleccionada.id,
				Hour: ctrl.horas.valor   
			};
			horasEndPoints.agregarHorasAlAlumno(objetoARegistrar, function(data){
				console.log(data);
				//mostrar mensaje de error o de exito dependiendo de la respuesta. 
			});
			
		};
    }]);
    
	
