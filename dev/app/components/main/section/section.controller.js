(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionController', SectionController);

    SectionController.$inject = [ '$rootScope', '$stateParams', '$state', 'TbUtils',
                                  'tableContent', 'ModalService', 'sections'];

    function SectionController($rootScope, $stateParams, $state, TbUtils, tableContent, ModalService, sections) {
        if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('dashboard.home');
        
        var vm = this;
        
        var confirmDeleteModal = {
          templateUrl: 'templates/components/main/section/' +
                       'confirm-delete/confirm-delete.html',
          controller: 'ConfirmDeleteController'
        };
        
        vm.sectionsLoading = true;
        vm.section = JSON.parse($stateParams.data);
        vm.sectionsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre']);
        vm.removeSection = removeSection;
        
        sections.getStudents(vm.section.Id, getStudentsSuccess, getStudentsFail);
        
        function removeSection() {
            ModalService.showModal(confirmDeleteModal)
              .then(modalResolve);
        }
        
        function modalResolve (modal) {
          modal.element.modal();
          modal.close.then(modalClose);
        }
        
        function modalClose (result) {
            if(result === true)
                deleteSection();
        }
        
        function deleteSection () {
            sections.deleteSection(vm.section.Id, deleteSectionSuccess, deleteSectionFail)
        }
        
        function deleteSectionSuccess() {
            $state.go('dashboard.sections');
        }
        
        function deleteSectionFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response.data, 'Error', 'No se ha podido borrar la seccion.');
        }
        
        function getStudentsSuccess(response) {
            console.log(response);
            if (response.data.length <= 0) {
                vm.sectionsLoading = false;
                return;
            }

            for (let i = 0; i < response.data.length; i++) {
                let section = response.data[i];

                let newTableElement = {
                    //actions: [acceptButton, rejectButton],
                    content: [
                        tableContent.createALableElement(section.AccountId),
                        tableContent.createALableElement(section.Name)
                    ]
                };

                vm.sectionsTable.body.push(newTableElement);
            }

            vm.sectionsLoading = false;
        }
        
        function getStudentsFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response.data, 'Error',
                                     'No se ha podido obtener los estudiantes de la seccion.');
        }
    }
})();