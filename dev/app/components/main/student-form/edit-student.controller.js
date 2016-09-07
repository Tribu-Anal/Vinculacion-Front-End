EditStudentController.$inject = [ 'TbUtils', 'students', 'majors', '$stateParams' ];

function EditStudentController (TbUtils, students, majors, stateParams) {
	const vm = this;

	vm.student = JSON.parse(atob(stateParams.student));
	vm.student.MajorId = vm.student.Major.MajorId;
	
	vm.names = vm.student.Name.split(' ');

	const oldAccountId = vm.student.AccountId;

	vm.formTitle = "Editar Estudiante";
    vm.submitting = false;
	vm.majorsLoading = true;
	vm.majors = [];
    vm.submit = submit;

    TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false;});

    function submit () {
    	vm.submitting = true;
    	vm.student.Name = vm.names.join(' ');

    	TbUtils.updateAndGoTo(students.update, oldAccountId, vm.student, 'main.students', 
			'Estudiante actualizado.', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'EditStudentController', ctrl: EditStudentController };