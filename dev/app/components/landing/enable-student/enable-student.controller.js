EnableStudentController.$inject = ['$rootScope', 'toaster', 'TbUtils', '$state', 'students'];

function EnableStudentController ($rootScope, toaster, TbUtils, $state, students) {
	const vm = this;

  vm.email = "";
  vm.accountId = "";
  vm.password = "";
  vm.submitting = false;
  vm.enableStudent = EnableStudent;

  function EnableStudent(){
    vm.submitting = true;
    let student = {
      AccountId: vm.accountId.toString(),
      Email: vm.email,
      Password: vm.password
    }
    students.enableStudent(vm.student, enableStudentSuccess, enableStudentFail);
  }

  function enableStudentSuccess(response){
    vm.submitting = false;
    TbUtils.displayNotification('success', 'Alumno habilitado exitosamente!', 'Habilitado');
    $state.go('landing.login');
  }

  function enableStudentFail(response){
    vm.submitting = false;
    TbUtils.showErrorMessage('error',
                             'No se encontro una cuenta valida con los datos ingresados',
                             'Error de Habilitacion');
  }

}

module.exports = { name: 'EnableStudentController', ctrl: EnableStudentController };
