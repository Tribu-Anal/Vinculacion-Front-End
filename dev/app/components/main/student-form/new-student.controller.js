NewStudentController.$inject = [ 'TbUtils', 'students', 'majors' ];

function NewStudentController (TbUtils, students, majors) {
	const vm = this;

	vm.student = {
		AccountId: '',
		Name: '',
		Password: '12345',
		MajorId: '',
		Campus: '',
		Email: ''
	}; 

	vm.formTitle = "Nuevo Estudiante";
	vm.submitting = false;
	vm.majorsLoading = true;
	vm.majors = [];
	vm.accountId = undefined;
	vm.submit = submit;

	TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false;});

	function submit() {
		vm.submitting = true;

		TbUtils.postAndGoTo(students.post, vm.student, 'main.students', 
			'Estudiante creado.', () => { vm.submitting = false; });
	}
}

module.exports = { name: 'NewStudentController', ctrl: NewStudentController };