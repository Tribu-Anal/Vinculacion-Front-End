AdminDashboardController.$inject = [ 'TbUtils', 'sectionProjects' ];

function AdminDashboardController (TbUtils, sectionProjects) {
	const vm = this;

	vm.sectionProjects = [];

	vm.toTitleCase = TbUtils.toTitleCase;

	vm.loading = true;

	TbUtils.getAndLoad(sectionProjects.getUnapproved, vm.sectionProjects, () => { vm.loading = false; });
}

module.exports = { name: 'AdminDashboardController', ctrl: AdminDashboardController };
