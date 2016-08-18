ProfessorFormController.$inject = ['$rootScope', '$state', 'professors', 'TbUtils'];

function ProfessorFormController($rootScope, $state, professors, TbUtils) {
    if ($rootScope.Role !== 'Admin') $state.go('main.dashboard');

    var vm = this;

    vm.professor = {
        AccountId: '',
        Name: '',
        Password: '12345',
        Email: '',
        Campus: 'SPS'
    };

    vm.accountId;

    vm.registerProfessor = registerProfessor;

    function registerProfessor() {
        vm.professor.AccountId = vm.accountId.toString();
        professors.registerProfessor(vm.professor, registerProfessorSuccess, registerProfessorFail);
    }

    function registerProfessorSuccess(response) {
        $state.go('main.dashboard');
        TbUtils.displayNotification('success', 'Profesor Creado!', 'Se le ha enviado un correo de activacion al profesor.');
    }

    function registerProfessorFail(response) {
        TbUtils.showErrorMessage('error', response, 'No se ha podido registrar al profesor', 'Error!');
    }
}

module.exports = {
    name: 'ProfessorFormController',
    ctrl: ProfessorFormController
};