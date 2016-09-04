NewProfessorController.$inject = [ 'TbUtils', 'professors' ];

function NewProfessorController(TbUtils, professors) {

    const vm = this;

    vm.formTitle = 'Nuevo Profesor';

    vm.professor = {
        AccountId: '',
        Name: '',
        Password: '12345',
        Email: '',
        Campus: 'SPS'
    };

    vm.submitting = false;
    vm.accountId = undefined;

    vm.submit = submit;

    function submit () {
        vm.submitting = true;

        vm.professor.AccountId = vm.accountId.toString();
        professors.registerProfessor(vm.professor, registerProfessorSuccess, registerProfessorFail);
    }

    function registerProfessorSuccess(response) {
        TbUtils.displayNotification('success', 'Profesor Creado!', 
            'Se le ha enviado un correo de activacion al profesor.');
        TbUtils.go('main.professors');
    }

    function registerProfessorFail(response) {
        TbUtils.showErrorMessage(response.data);
    }

}

module.exports = { name: 'NewProfessorController', ctrl: NewProfessorController };