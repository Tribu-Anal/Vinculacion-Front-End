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
    vm.names = [ '', '', '', '' ];

    vm.submitting = false;

    vm.submit = submit;

    function submit () {
        vm.submitting = true;
        vm.professor.Name = vm.names.join(' ');

        TbUtils.postAndGoTo(professors.registerProfessor, vm.professor, 
            'main.professors', 'Se le ha enviado un correo de activacion al profesor.', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'NewProfessorController', ctrl: NewProfessorController };