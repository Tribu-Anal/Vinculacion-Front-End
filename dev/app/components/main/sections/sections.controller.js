(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('SectionsController', SectionsController);

	SectionsController.$inject = ['$rootScope', '$scope', '$state', 
								  'TbUtils', 'tableContent'];

	function SectionsController($rootScope, $scope, $state, TbUtils, tableContent) {
		if ($rootScope.Role !== 'Admin') $state.go('dashboard.home');
		
		var vm = this;
        
//		var acceptButton = {
//            tooltip: 'Aceptar',
//            icon: 'glyphicon-ok',
//            onClick: acceptButtonClicked
//        };
//
//        var rejectButton = {
//            tooltip: 'Rechazar',
//            icon: 'glyphicon-remove',
//            onClick: rejectButtonClicked
//        };

        vm.sectionsLoading = false;

        vm.sectionsTable = {
            headers: [
                'Codigo',
                'Clase',
                'Periodo',
                'Catedratico'
            ],
            
            body: [],
            
            actions: true
        };        

//        function getRequestSuccess(response) {
//            if (response.data.length <= 0) {
//                vm.requestsLoading = false;
//                return;
//            }
//
//            for (let i = 0; i < response.data.length; i++) {
//                let student = response.data[i];
//                if (student.Major === null) continue;
//
//                let newTableElement = {
//                    actions: [acceptButton, rejectButton],
//                    content: [
//                        tableContent.createALableElement(student.AccountId),
//                        tableContent.createALableElement(student.Name),
//                        tableContent.createALableElement(student.Major.Name),
//                        tableContent.createALableElement(student.Email)
//                    ],
//                    id: student.Id
//                };
//
//                vm.requestsTable.body.push(newTableElement);
//            }
//
//            vm.requestsLoading = false;
//        };
//
//        function getElement(index) {
//            console.log(index);
//            let element = {
//                accountNumber: vm.requestsTable.body[index].content[0].properties.value,
//                studentName: vm.requestsTable.body[index].content[1].properties.value,
//                id: vm.requestsTable.body[index].id
//            }
//
//            return element;
//        }
    }
})();