EnableStudentController.$inject = ['$rootScope', 'TbUtils', 'students'];

function EnableStudentController ($rootScope, TbUtils,  students) {
	const vm = this;

  vm.email = "";
  vm.accountId = "";
  vm.password = "";
  vm.submitting = false;
  vm.enableStudent = enableStudent;

  function enableStudent(){
    vm.submitting = true;
    let student = {
      AccountId: vm.accountId.toString(),
      Email: vm.email,
      Password: vm.password
    };
    students.enableStudent(student, enableStudentSuccess, enableStudentFail);
  }

  function enableStudentSuccess(response){
    TbUtils.displayNotification('success', 'Revisa tu correo con el link, para activar tu cuenta.', 'Correo enviado!');
    vm.submitting = false;
    TbUtils.go('landing.login');
  }

  function enableStudentFail(response){
    TbUtils.showErrorMessage('error', response,
                             'No se encontro una cuenta valida con los datos ingresados',
                             'Error de Habilitacion');
    vm.submitting = false;
  }

}

module.exports = { name: 'EnableStudentController', ctrl: EnableStudentController };
