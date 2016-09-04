EditProfessorController.$inject = [ 'TbUtils', 'professors', '$stateParams' ];

function EditProfessorController (TbUtils, professors, stateParams) {
	const vm = this;

	vm.formTitle = 'Editar Profesor';

	vm.professor = JSON.parse(atob(stateParams.professor));

	const oldAccountId = vm.professor.AccountId;

    vm.submitting = false;
    vm.accountId = Number(vm.professor.AccountId);

    vm.submit = submit;

    function submit () {
    	vm.submitting = true;
    	vm.professor.AccountId = vm.accountId.toString();

    	TbUtils.updateAndGoTo(professors.update, oldAccountId, vm.professor, 
            'main.professors', 'Profesor actualizado!', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'EditProfessorController', ctrl: EditProfessorController };