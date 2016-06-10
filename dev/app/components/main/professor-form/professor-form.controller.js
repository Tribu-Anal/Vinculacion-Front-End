(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProfessorFormController', ProfessorFormController);

    ProfessorFormController.$inject = ['$rootScope', '$state', 'professors', 'TbUtils'];

    function ProfessorFormController($rootScope, $state, professors, TBUtils) {
        if ($rootScope.Role !== 'Admin') $state.go('dashboard.home');

        var vm = this;

        vm.professor = {
            AccountId: '',
            Name: '',
            Email: '',
            Campus: 'SPS'
        };
        
        vm.accountId = 0;
        
        vm.registerProfessor = registerProfessor;
        
        function registerProfessor() {
            vm.professor.AccountId = vm.accountId.toString();
            professors.registerProfessor(vm.professor, registerProfessorSuccess, registerProfessorFail);
        }
        
        function registerProfessorSuccess(response) {
            $state.go('dashboard.home');
            TBUtils.displayNotification('success', 'Profesor Creado!', 'Se le ha enviado un correo de activacion al profesor.');
        }
        
        function registerProfessorFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response, 'No se ha podido registrar al profesor', 'Error!');
        }
    }
})();