ActivateProfessorController.$inject = ['$rootScope', '$stateParams', 'professors', 'TbUtils', 'auth'];

function ActivateProfessorController($rootScope, $stateParams, professors, TbUtils, auth) {

    var vm = this;

    vm.professor = {
        AccountId: '',
        Password: ''
    };

    vm.accountId;
    vm.confirmPass = '';
    vm.submitting = false;
    vm.activateProfessor = activateProfessor;
    $rootScope.globals.guest = true;

    leaveIfSessionStarted();
    getToken();

    function activateProfessor() {
        vm.submitting = true;
        professors.activateProfessor(vm.professor, activateProfessorSuccess, activateProfessorFail);
    }

    function activateProfessorSuccess(response) {
        TbUtils.go('landing.login');
        TbUtils.displayNotification('success', 'Usuario activado!', 'Ya puede navegar el sitio.');
    }

    function activateProfessorFail(response) {
        TbUtils.showErrorMessage(response.data);
        TbUtils.go('landing.login');
    }

    function getToken() {
        if ($stateParams.accountId == undefined || $stateParams.accountId == '')
            TbUtils.go('landing.login');
        vm.professor.AccountId = $stateParams.accountId;
    }

    function leaveIfSessionStarted() {
        if ($rootScope.globals.token) {
            auth.ClearCredentials();
            TbUtils.go('landing.login');
        }
    }
}

module.exports = {
    name: 'ActivateProfessorController',
    ctrl: ActivateProfessorController
};
