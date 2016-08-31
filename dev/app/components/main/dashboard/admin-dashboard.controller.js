AdminDashboardController.$inject = ['$rootScope', '$stateParams', 'sectionProjects', 'TbUtils'];

function AdminDashboardController ($rootScope, $stateParams, sectionProjects, TbUtils) {
	const vm = this;
	vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
	vm.sprojects = null;
	sectionProjects.getUnapproved(unapprovedSuccess, unapprovedFail);
	vm.toTitleCase = TbUtils.toTitleCase;
	vm.sectionsProjectsLoading = true;
	function unapprovedSuccess(response){
		vm.preventGeneralLoading();
		vm.sprojects = response.data;
		if(vm.sprojects.length <= 0) return;

		vm.sectionsProjectsLoading = false;
	}

	function unapprovedFail(response){
		TbUtils.displayNotification('error', 'Error',
				'Informacion correspondiente al dashboard no se pudo cargar.');
	}
}

module.exports = { name: 'AdminDashboardController', ctrl: AdminDashboardController };
