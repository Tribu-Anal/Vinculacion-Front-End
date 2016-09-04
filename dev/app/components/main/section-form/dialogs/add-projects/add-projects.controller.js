AddProjectsController.$inject = [ 'TbUtils', 'projects', 'close' ];

function AddProjectsController(TbUtils, projects, _close) {
    const vm = this;

    vm.projects = [];
    vm.projectsSelected = TbUtils.getListCopy(projects.selectedProjects);

    vm.searchObj = term => { return { Name: term }; };
    vm.searchResults = [];
    vm.getAll = projects.getProjects;

    vm.pageSize = 10;
    vm.get = projects.getProjectsWithPagination;
    vm.hideLoadBtn = () => vm.projects.length !== vm.searchResults.length;

    vm.loading = true;

    TbUtils.getAndLoad(vm.get, vm.projects, () => { vm.loading = false; }, 0, vm.pageSize);

    vm.accept = () => { _close(vm.projectsSelected, 500); };
    vm.close =  () => { _close(null, 500); };

}

module.exports = { name: 'AddProjectsController', ctrl: AddProjectsController };