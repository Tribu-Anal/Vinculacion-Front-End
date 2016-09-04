EditStudentController.$inject = ['majors', 'TbUtils', '$stateParams', 'students'];

function EditStudentController (majors, TbUtils, stateParams, students) {
	const vm = this;

	vm.oldStudent = JSON.parse(atob(stateParams.student));

	vm.student = {
		AccountId: '',
		Name: vm.oldStudent.Name,
		Password: vm.oldStudent.Password,
		MajorId: vm.oldStudent.Major.MajorId,
		Campus: vm.oldStudent.Campus,
		Email: vm.oldStudent.Email
	};

	const oldAccountId = vm.oldStudent.AccountId;

	vm.formTitle = "Editar Estudiante";
    vm.submitting = false;
    vm.accountId = Number(vm.oldStudent.AccountId);
	vm.majorsLoading = true;
	vm.majors = [];

    vm.submit = submit;
    TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false;});

    function submit () {
    	vm.submitting = true;
    	vm.student.AccountId = vm.accountId.toString();
    }

}

module.exports = { name: 'EditStudentController', ctrl: EditStudentController };