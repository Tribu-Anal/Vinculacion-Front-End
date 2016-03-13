(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('RequestsController', RequestsController);

	RequestsController.$inject = ['$scope','solicitudesEndPoints', 'toaster'];

	function RequestsController ($scope,solicitudesEndPoints, toaster) {
			var vm = this;
			var acceptButton = 
			{
				nombre: 'Aceptar',
				icon:'glyphicon glyphicon-ok',
				click: function(index) {
					/*
					 * @todo Tiene que funcionar sin el dialog
					 */
				}
			};
			var rejectButton = 
			{
				nombre: 'Rechazar',
				icon:'glyphicon glyphicon-remove',
				click: function(index) {
					/*
					 * @todo Tiene que funcionar sin el dialog
					 */
				}
			};

			vm.requestsTable = 
			{
				encabezado: 
				[
					'Numero de Cuenta',
					'Nombre',
					'Carrera',
					'Correo Electronico'
	            ],
				cuerpo: [],
				acciones: true
			};

			solicitudesEndPoints.obtenerAlumnosConSolicitudesPendientes( function(response) {
				if (response.data.length <= 0) return;

				for (let student in response.data) {
					if (student.Major === null) continue;

					let newTableElement = 
					{
						acciones: [ acceptButton, rejectButton ],
						contenido:[
							student.AccountId,
							student.Name,
							student.Major.Name,
							student.Email
						],
						id: student.Id
					};

					vm.requestsTable.cuerpo.push(newTableElement);
				}
			});

	}
})();