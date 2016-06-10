(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ActivateProfessorController', ActivateProfessorController);

    ActivateProfessorController.$inject = ['$rootScope', '$state', 'professors', 'TbUtils'];

    function ActivateProfessorController($rootScope, $state, professors, TBUtils) {
//        if ($rootScope.Role !== 'Professor') $state.go('dashboard.home');

        var vm = this;

        vm.professor = {
            accountId: '',
            Password: ''
        };
        
        vm.accountId = 0;
        vm.confirmPass = '';
        
        vm.activateProfessor = activateProfessor;
        
        function activateProfessor() {
            vm.professor.accountId = vm.accountId.toString();
            professors.activateProfessor(vm.professor, activateProfessorSuccess, activateProfessorFail);
        }
        
        function activateProfessorSuccess(response) {
            $state.go('dashboard.home');
            TBUtils.displayNotification('success', 'Usuario activado!', 'Ya puede navegar el sitio.');
        }
        
        function activateProfessorFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response, 'No se ha podido activar al profesor.', 'Error!');
        }
    }
})();