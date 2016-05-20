(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('SectionsController', SectionsController);

	SectionsController.$inject = ['$rootScope', '$scope', '$state', 
								  'TbUtils', 'tableContent', 'sections'];

	function SectionsController($rootScope, $scope, $state, TbUtils, tableContent, sections) {
		if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('dashboard.home');
		
		var vm = this;
        
        vm.sectionsLoading = false;

        vm.sectionsTable = {
            headers: [
                'Codigo',
                'Clase',
                'Periodo',
                'Año',
                'Catedratico'
            ],
            
            body: [],
            
            actions: true
        };
        
        vm.goSection = goSection;
        vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
        
//		var acceptButton = {
//            tooltip: 'Aceptar',
//            icon: 'glyphicon-ok'
//            //onClick: acceptButtonClicked
//        };
//
//        var rejectButton = {
//            tooltip: 'Rechazar',
//            icon: 'glyphicon-remove'
//            //onClick: rejectButtonClicked
//        };
        
        sections.getSections(getSectionsSuccess, getSectionsFail);
        
        function goSection(index) {
            console.log("Entro");
        }

        function getSectionsSuccess(response) {
            if (response.data.length <= 0) {
                vm.sectionsLoading = false;
                return;
            }

            for (let i = 0; i < response.data.length; i++) {
                let section = response.data[i];

                let newTableElement = {
                    //actions: [acceptButton, rejectButton],
                    content: [
                        tableContent.createALableElement(section.Code),
                        tableContent.createALableElement(section.Class.Name),
                        tableContent.createALableElement(section.Period.Number),
                        tableContent.createALableElement(section.Period.Year),
                        tableContent.createALableElement(section.User.Name)
                    ],
                    data: section
                };

                vm.sectionsTable.body.push(newTableElement);
            }

            vm.sectionsLoading = false;
        };
        
        function getSectionsFail(response) {
            console.log(response);
        }
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