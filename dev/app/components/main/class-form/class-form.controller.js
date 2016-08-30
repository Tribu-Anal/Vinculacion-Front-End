ClassFormController.$inject = ['$rootScope', '$state', 'TbUtils', 'classes'];

function ClassFormController ($rootScope, $state, TbUtils, classes) {
	if ($rootScope.Role !== 'Admin') $state.go('main.' + $rootScope.Role.toLowerCase() + "-dashboard");

	const vm = this;

	vm.class = {
		Name: '',
		Code: ''
	};

	vm.submitting = false;
	vm.submit = submit;

	function submit() {
		vm.submitting = true;
		classes.postClass(vm.class, postSuccess, postFail);
	}

	function postSuccess() {
		TbUtils.displayNotification('success', 'Exito!', 'La clase ha sido creada!');
		TbUtils.preventGeneralLoading();
		$state.go('main.projects');
	}

	function postFail(response) {
		vm.submitting = false;
		TbUtils.showErrorMessage('error', response, 'No se pudo crear la clase!', 'Error');
	}
}

module.exports = { name: 'ClassFormController', ctrl: ClassFormController };