EditClassController.$inject = [ 'TbUtils', 'classes', '$stateParams' ];

function EditClassController (TbUtils, classes, stateParams) {
	const vm = this;

	vm.class = JSON.parse(atob(stateParams._class));

	vm.formTitle = 'Editar Clase';
	vm.submitting = false;
	vm.submit = submit;

	init();

	function init () {
		if (!vm.class || !vm.class.Id) {
			TbUtils.displayNotification('error', 'Error', 'La clase no existe.');
			TbUtils.go('main.classes');
		}
	}

	function submit () {
		vm.submitting = true;
		classes.update(vm.class.Id, vm.class, updateSuccess, updateFail);
	}

	function updateSuccess (response) {
		TbUtils.displayNotification('success', 'Exito!', 'La clase ha sido creada!');
		TbUtils.go('main.classes');
	}

	function updateFail (response) {
		vm.submitting = false;
		TbUtils.showErrorMessage(response.data);
	}

}

module.exports = { name: 'EditClassController', ctrl: EditClassController };