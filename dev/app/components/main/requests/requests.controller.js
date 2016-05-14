(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', 'requests', 'TbUtils', 'tableContent'];

    function RequestsController($scope, requests, TbUtils, tableContent) {
        var vm = this;

        var acceptButton = {
            tooltip: 'Aceptar',
            icon: 'glyphicon-ok',
            onClick: acceptButtonClicked
        };

        var rejectButton = {
            tooltip: 'Rechazar',
            icon: 'glyphicon-remove',
            onClick: rejectButtonClicked
        };

        vm.requestsLoading = true;

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

        requests.getRequests(getRequestSuccess, getRequestFail);

        function getRequestSuccess(response) {
            if (response.data.length <= 0) {
                vm.requestsLoading = false;
                return;
            }

            for (let i = 0; i < response.data.length; i++) {
                let student = response.data[i];

                if (student.Major === null) continue;

                let newTableElement = {
                    actions: [acceptButton, rejectButton],
                    content: [
                        tableContent.createALableElement(student.AccountId),
                        tableContent.createALableElement(student.Name),
                        tableContent.createALableElement(student.Major.Name),
                        tableContent.createALableElement(student.Email)
                    ],
                    id: student.Id
                };

                vm.requestsTable.body.push(newTableElement);
            }

            vm.requestsLoading = false;
        };

        function getRequestFail(response) {
            console.log(response);
            TbUtils.displayNotification('error', 'Falla de solicitudes',
                'No se ha podido obtener las solicitudes de estudiantes.');
            vm.requestsLoading = false;
        }

        function getElement(index) {
            let element = {
                accountNumber: vm.requestsTable.body[index].content[0],
                studentName: vm.requestsTable.body[index].content[1],
                id: vm.requestsTable.body[index].id
            }

            return element;
        }

        function acceptButtonClicked(index) {
            let student = getElement(index);
            let message = 'Aceptado, ya puede ingresar sus horas de vinculación social.';
            requests.acceptRequest(student, acceptRequestSuccess, acceptRequestFail);
        }

        function rejectButtonClicked(index) {
            let student = getElement(index);
            let message = 'Rechazado por no cumplir los requisitos';
            requests.rejectRequest(student, message, rejectRequestSuccess, rejectRequestFail);
        }

        function acceptRequestSuccess(index) {
            vm.requestsTable.body.splice(index, 1);
        }

        function acceptRequestFail(response) {
            console.log(response);
        }

        function rejectRequestSuccess(index) {
            vm.requestsTable.body.splice(index, 1);
        }

        function rejectRequestFail(response) {
            console.log(response);
        }
    }
})();