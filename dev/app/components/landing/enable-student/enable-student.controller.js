EnableStudentController.$inject = ['$rootScope', 'toaster', 'TbUtils', '$state', 'students'];

function EnableStudentController ($rootScope, toaster, TbUtils, $state, students) {
	const vm = this;

  vm.email = "";
  vm.accountId = "";
  vm.password = "";

  vm.enableStudent = EnableStudent;

  function EnableStudent(){
    let student = {
      AccountId: vm.AccountId,
      Email: vm.email,
      Password: vm.password
    }
    console.log("Data that is going to be sent: "+JSON.stringify(student));
    students.enableStudent(vm.student, enableStudentSuccess, enableStudentFail);
  }

  function enableStudentSuccess(response){
    console.log(response);
    TbUtils.displayNotification('success', 'Alumno habilitado exitosamente!', 'Habilitado');
    $state.go('landing.login');
  }

  function enableStudentFail(response){
    console.log(response);
    TbUtils.showErrorMessage('error',
                             'No se encontro una cuenta valida con los datos ingresados',
                             'Error de Habilitacion');
  }

}

module.exports = { name: 'EnableStudentController', ctrl: EnableStudentController };
