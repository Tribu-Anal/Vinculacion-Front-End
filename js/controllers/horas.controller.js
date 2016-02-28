    'use strict';
	var app = angular.module('VinculacionApp');
	app.controller('horasController', ['$scope','horasEndPoints',function($scope, horasEndPoints) {
		var ctrl = this;
		ctrl.secciones={
			opciones:[
				{id:1, nombre: 'INF405'},
				{id:1, nombre: 'Testing'}
			],
			opcionSeleccionada:{}
		};
		ctrl.proyectos={
			opciones:[
				{id:1, nombre: 'Proyecto de Vinculacion Unitec'},
				{id:1, nombre: 'Proyecto Testting'}
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
			console.log(data);
			//agregar los elemententos al select de alumnos
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
				numberId: ctrl.alumnos.opcionSeleccionada.id,
				sectionId: ctrl.secciones.opcionSeleccionada.id,
				projectId: ctrl.proyectos.opcionSeleccionada.id,
				hour: ctrl.horas.valor   
			};
			horasEndPoints.agregarHorasAlAlumno(objetoARegistrar, function(data){
				//mostrar mensaje de error o de exito dependiendo de la respuesta. 
			});
			
		};
    }]);
    
	
