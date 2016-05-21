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
        
        vm.section = JSON.parse($stateParams.data);
        vm.sectionsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre']);
        vm.removeSection = removeSection;
        
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
    }
})();