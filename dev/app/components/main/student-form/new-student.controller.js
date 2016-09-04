NewStudentController.$inject = ['majors', 'TbUtils'];

function NewStudentController (majors, TbUtils) {
	const vm = this;

	vm.student = {
		AccountId: '',
		Name: '',
		Password: '',
		MajorId: '',
		Campus: '',
		Email: ''
	};

	vm.formTitle = "Nuevo Estudiante"
	vm.submitting = false;
	vm.majorsLoading = true;
	vm.majors = [];
	vm.accountId = undefined;
	vm.submit = submit;

	TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false;});

	function submit() {
		vm.student.AccountId = vm.accountId.toString();
		vm.submitting = true;
	}
}

module.exports = { name: 'NewStudentController', ctrl: NewStudentController };