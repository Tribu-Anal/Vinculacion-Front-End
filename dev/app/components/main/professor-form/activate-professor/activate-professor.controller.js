(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ActivateProfessorController', ActivateProfessorController);

    ActivateProfessorController.$inject = ['$rootScope', '$state', '$stateParams', 'professors', 'TbUtils', 'authentication'];

    function ActivateProfessorController($rootScope, $state, $stateParams, professors, TBUtils, authentication) {

        var vm = this;

        vm.professor = {
            AccountId: '',
            Password: ''
        };
        
        vm.accountId;
        vm.confirmPass = '';
        
        vm.activateProfessor = activateProfessor;
        $rootScope.globals.guest = true;
        
        leaveIfSessionStarted();
        getToken();
        
        function activateProfessor() {
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
        
        function getToken() {
            if($stateParams.accountId == undefined || $stateParams.accountId == '') $state.go('landing');
            
            console.log($stateParams.accountId);
            vm.professor.AccountId = $stateParams.accountId;
        }
        
        function leaveIfSessionStarted() {
            if($rootScope.globals.token) {
                authentication.ClearCredentials();
                $state.go('landing');
            }
        }
    }
})();