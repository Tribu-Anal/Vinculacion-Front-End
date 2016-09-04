StudentFormController.$inject = ['majors', 'TbUtils'];

function StudentFormController (majors, TbUtils) {
	const vm = this;

	vm.student = {
		AccountId: '',
		Name: '',
		Password: '',
		MajorId: '',
		Campus: '',
		Email: ''
	};

	vm.submitting = false;
	vm.majorsLoading = true;
	vm.majors = [];
	vm.submit = submit;

	TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false;});

	function submit() {
		vm.submitting = true;
		console.log(vm.student);
	}
}

module.exports = { name: 'StudentFormController', ctrl: StudentFormController };