NewClassController.$inject = [ 'TbUtils', 'classes' ];

function NewClassController (TbUtils, classes) {
	const vm = this;

	vm.class = {
		Name: '',
		Code: ''
	};

	vm.formTitle = 'Crear Clase';
	vm.submitting = false;
	vm.submit = submit;

	function submit() {
		vm.submitting = true;
		classes.postClass(vm.class, postSuccess, postFail);
	}

	function postSuccess() {
		TbUtils.displayNotification('success', 'Exito!', 'La clase ha sido creada!');
		TbUtils.go('main.classes');
	}

	function postFail(response) {
		vm.submitting = false;
		TbUtils.showErrorMessage(response.data);
	}
}

module.exports = { name: 'NewClassController', ctrl: NewClassController };