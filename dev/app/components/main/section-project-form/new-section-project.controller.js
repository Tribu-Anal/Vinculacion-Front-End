NewSectionProjectController.$inject = [ 'TbUtils', 'projects', 'sectionProjects',
                                         'sectionId', 'projectIds', '$mdDialog', 'filterFilter' ];

function NewSectionProjectController (TbUtils, projects, sectionProjects, sectionId, 
	                                   projectIds, mdDialog, filterFilter) {
	const vm = this;

	vm.project = {
		SectionId: sectionId,
		ProjectIds: projectIds,
		Description: '',
		Cost: 0
	};

	vm.selectedProject = null;

	vm.search = search;
	vm.submit = submit;

	vm.cancel = () => { mdDialog.cancel(); };
	
	vm.projectsLoading = false;
	vm.submitting = false;

	init();

	function init () {
		if (!projects.cached || projects.cached.length === 0) {		
			vm.projectsLoading = true;
			projects.cached = [];
			TbUtils.getAndLoad(projects.getProjects, projects.cached, () => { vm.projectsLoading = false; });
		}
	}

	function submit () {
		if (!vm.selectedProject) return;

		vm.submitting = true;

		vm.project.ProjectIds.push(vm.selectedProject.Id);

		sectionProjects.post(vm.project, 
			resp => { mdDialog.hide(resp.data); }, 
			resp => { TbUtils.showErrorMessage(resp.data); mdDialog.cancel(); }, 
			() => { vm.submitting = false; });
	}

	function search (term) {
		return filterFilter(projects.cached, { Name: term });
	}

}

module.exports = { name: 'NewSectionProjectController', ctrl: NewSectionProjectController };