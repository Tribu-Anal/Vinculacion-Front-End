(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProfessorFormController', ProfessorFormController);

    ProfessorFormController.$inject = ['$rootScope', '$state', '$scope', 'professors', 'TbUtils'];

    function ProfessorFormController($rootScope, $state, $scope, professors, TBUtils) {
        if ($rootScope.Role !== 'Admin') $state.go('dashboard.home');

        var vm = this;

        vm.professor = {
            accountId: '',
            Name: '',
            Email: '',
            Campus: ''
        };
        
        vm.registerProfessor = registerProfessor;
        
        function registerProfessor() {
            vm.professor.accountId = $scope.accountId.toString();
            professors.registerProfessor(vm.professor, registerProfessorSuccess, registerProfessorFail);
        }
        
        function registerProfessorSuccess(response) {
            $state.go('dashboard.home');
        }
        
        function registerProfessorFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response, 'No se ha podido registrar al profesor', 'Error!');
        }
    }
})();