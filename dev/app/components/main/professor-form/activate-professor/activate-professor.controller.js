(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ActivateProfessorController', ActivateProfessorController);

    ActivateProfessorController.$inject = ['$rootScope', '$state', 'professors', 'TbUtils'];

    function ActivateProfessorController($rootScope, $state, professors, TBUtils) {

        var vm = this;

        vm.professor = {
            AccountId: '',
            Password: ''
        };
        
        vm.accountId = 0;
        vm.confirmPass = '';
        
        vm.activateProfessor = activateProfessor;
        
        function activateProfessor() {
            vm.professor.AccountId = vm.accountId.toString();
            professors.activateProfessor(vm.professor, activateProfessorSuccess, activateProfessorFail);
        }
        
        function activateProfessorSuccess(response) {
            $state.go('landing');
            TBUtils.displayNotification('success', 'Usuario activado!', 'Ya puede navegar el sitio.');
        }
        
        function activateProfessorFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response, 'No se ha podido activar el profesor.', 'Error!');
        }
    }
})();