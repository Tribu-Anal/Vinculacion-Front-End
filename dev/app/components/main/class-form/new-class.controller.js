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
		TbUtils.postAndGoTo(classes.postClass, vm.class, 
			'main.classes', 'La clase se creo con exito!', () => { vm.submitting = false; });
	}

}

module.exports = { name: 'NewClassController', ctrl: NewClassController };