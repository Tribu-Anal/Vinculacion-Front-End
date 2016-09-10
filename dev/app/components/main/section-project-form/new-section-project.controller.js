NewSectionProjectController.$inject = [ 'TbUtils', 'projects', 'sectionProjects',
                                         'sectionId', 'projectIds', '$mdDialog', 'filterFilter' ];

function NewSectionProjectController (TbUtils, projects, sectionProjects, sectionId, 
	                                   projectIds, mdDialog, filterFilter) {
	const vm = this;

	vm.project = {
		SectiontId: sectionId,
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

		sectionProjects.post(vm.project, assignProjects, close, 
			() => { vm.submitting = false; });
	}

	function close (resp) {
		TbUtils.showErrorMessage(resp.data); 
		mdDialog.cancel();
	}

	function assignProjects (response) {
		projects.assignProjectstoSection(vm.project.ProjectIds, sectionId, 
			resp => { mdDialog.hide(response.data.map(obj => obj.Project)); },
			close, () => { vm.submitting = false; });
	}

	function search (term) {
		return filterFilter(projects.cached, { Name: term });
	}

}

module.exports = { name: 'NewSectionProjectController', ctrl: NewSectionProjectController };