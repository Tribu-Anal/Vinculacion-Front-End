EditProfessorController.$inject = [ 'TbUtils', 'professors', '$stateParams' ];

function EditProfessorController (TbUtils, professors, stateParams) {
	const vm = this;

	vm.formTitle = 'Editar Profesor';

	vm.professor = JSON.parse(atob(stateParams.professor));
    vm.names = vm.professor.Name.split(' ');

	const oldAccountId = vm.professor.AccountId;

    vm.submitting = false;

    vm.submit = submit;

    function submit () {
    	vm.submitting = true;
    	vm.professor.Name = vm.names.join(' ');

    	TbUtils.updateAndGoTo(professors.update, oldAccountId, vm.professor, 
            'main.professors', 'Profesor actualizado!', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'EditProfessorController', ctrl: EditProfessorController };