(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProfessorFormController', ProfessorFormController);

    ProfessorFormController.$inject = ['$rootScope', '$state', 'professors'];

    function ProfessorFormController($rootScope, $state, professors) {
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
            professors.registerProfessor(vm.professor, registerProfessorSuccess, registerProfessorFail);
        }
        
        function registerProfessorSuccess(response) {
            
        }
        
        function registerProfessorFail(response) {
            console.log(response);            
        }
    }
})();