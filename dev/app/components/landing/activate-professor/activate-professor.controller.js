ActivateProfessorController.$inject = [ 'TbUtils', 'professors', '$stateParams' ];

function ActivateProfessorController(TbUtils, professors, stateParams) {

    const vm = this;

    vm.professor = { AccountId: stateParams.accountId, Password: '' };

    vm.confirmPass = '';
    vm.submit = submit;
    vm.submitting = false;

    function submit () {
        vm.submitting = true;

        TbUtils.postAndGoTo(professors.activateProfessor, vm.professor, 'landing.login', 
            'Su cuenta ha sido activada.', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'ActivateProfessorController', ctrl: ActivateProfessorController };
