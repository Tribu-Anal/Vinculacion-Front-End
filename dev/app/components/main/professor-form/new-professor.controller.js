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
        TbUtils.postAndGoTo(professors.registerProfessor, vm.professor, 
            'main.professors', 'Se le ha enviado un correo de activacion al profesor.', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'NewProfessorController', ctrl: NewProfessorController };