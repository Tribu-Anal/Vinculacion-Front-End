(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('RequestsController', RequestsController);

	RequestsController.$inject = ['$scope','requests', 'toaster'];

	function RequestsController ($scope, requests, toaster) {
			var vm = this;
			var acceptButton = 
			{
				name: 'Aceptar',
				icon:'glyphicon glyphicon-ok',
				click: function(index) {
					/*
					 * @todo Tiene que funcionar sin el dialog
					 */
				}
			};
			var rejectButton = 
			{
				name: 'Rechazar',
				icon:'glyphicon glyphicon-remove',
				click: function(index) {
					/*
					 * @todo Tiene que funcionar sin el dialog
					 */
				}
			};

			vm.requestsTable = 
			{
				headers: 
				[
					'Numero de Cuenta',
					'Nombre',
					'Carrera',
					'Correo Electronico'
	            ],
				body: [],
				actions: true
			};

			requests.getRequests( function(response) {
				if (response.data.length <= 0) return;

				for (let student in response.data) {
					if (student.Major === null) continue;

					let newTableElement = 
					{
						actions: [ acceptButton, rejectButton ],
						content:[
							student.AccountId,
							student.Name,
							student.Major.Name,
							student.Email
						],
						id: student.Id
					};

					vm.requestsTable.body.push(newTableElement);
				}
			});

	}
})();