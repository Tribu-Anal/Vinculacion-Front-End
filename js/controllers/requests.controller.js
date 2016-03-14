(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('RequestsController', RequestsController);

	RequestsController.$inject = ['$scope', 'requests', 'toaster','ngDialog'];

	function RequestsController($scope, requests, toaster,ngDialog) {
		var vm = this;
		var acceptButton = {
			name: 'Aceptar',
			icon: 'glyphicon glyphicon-ok',
			click: function(index) {
				let student = getElement(index);
				let message = 'Aceptado, ya puede ingresar sus horas de vinculación social.';
				openDialog('Aceptar Alumno', message,student.id, student.studentName, student.accountNumber, function(resp){
					requests.acceptRequest(resp, function(data){
						toaster.pop({type: 'success', title: 'Alumno aceptado', body: 'El alumno ahora puede iniciar sesion con su cuenta'});
						    vm.requestsTable.body.splice(index,1);
						});
					});
				});
			}
		};
		var rejectButton = {
			name: 'Rechazar',
			icon: 'glyphicon glyphicon-remove',
			click: function(index) {
				let student = getElement(index);
				let message = 'Rechazado por no cumplir los requisitos';
				openDialog('Rechazar Alumno', message,student.id, student.studentName, student.accountNumber, function(resp){
					requests.rejectRequest (resp, message, function(data) {
						toaster.pop({type: 'success', title: 'Alumno rechazado', body: 'El alumno ha sido denegado'});
						    vm.requestsTable.body.splice(index,1);
						});
					});
				});
			}
		};

		vm.requestsTable = {
			headers: [
				'Numero de Cuenta',
				'Nombre',
				'Carrera',
				'Correo Electronico'
			],
			body: [],
			actions: true
		};

		requests.getRequests(function(response) {
			if (response.data.length <= 0) return;

			for (let student in response.data) {
				if (student.Major === null) continue;

				let newTableElement = {
					actions: [acceptButton, rejectButton],
					content: [
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

		function openDialog(title, message, id, studentName, accountNumber, callback){
			var dialog = ngDialog.open({
				template: 'js/directives/dialog/dialog.view.html',
				controller: ['$scope', function($scope){
					$scope.buttons = [
						{
							text: 'Aceptar',
							click: function(){
								let objectoCallback = {};
								objectoCallback.AccountId=$scope.student.accountNumber;
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
					$scope.template = 'templates/request.dialog.html';
					$scope.title = title;
					$scope.field = {label: 'Mensaje', value: message};
					$scope.student ={name: studentName, accountNumber: accountNumber};
				}]
			});
		};

		function getElement(index) {
			let element = {
				accountNumber: vm.requestsTable.body[index].content[0],
				studentName: vm.requestsTable.body[index].content[1],
				id: vm.requestsTable.body[index].id 
			}
			return element;
		}
	}
})();