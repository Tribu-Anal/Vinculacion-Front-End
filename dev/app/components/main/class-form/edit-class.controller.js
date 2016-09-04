EditClassController.$inject = [ 'TbUtils', 'classes', '$stateParams' ];

function EditClassController (TbUtils, classes, stateParams) {
	const vm = this;

	vm.class = JSON.parse(atob(stateParams._class));

	vm.formTitle = 'Editar Clase';
	vm.submitting = false;
	vm.submit = submit;

	function submit () {
		vm.submitting = true;
		TbUtils.updateAndGoTo(classes.update, vm.class.Id, vm.class, 
			'main.classes', 'La clase ha sido actualizada con exito!', () => { vm.submitting = false; });
	}

}

module.exports = { name: 'EditClassController', ctrl: EditClassController };