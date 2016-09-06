EnableStudentController.$inject = [ 'TbUtils', 'students' ];

function EnableStudentController (TbUtils,  students) {
	const vm = this;

  vm.student = {
    AccountId: 0,
    Email: "",
    Password: ""
  };

  vm.submitting = false;
  vm.submit = submit;

  function submit (){
    vm.submitting = true;

    TbUtils.postAndGoTo(students.enableStudent, vm.student, 'landing.login', 
      'Revisa tu correo con el link, para activar tu cuenta.', () => { vm.submitting = false; });
  }

}

module.exports = { name: 'EnableStudentController', ctrl: EnableStudentController };
