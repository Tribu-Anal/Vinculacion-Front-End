AddProjectsController.$inject = ['$scope', 'close', 'TbUtils', 'projects', 'filterFilter', '$rootScope'];

function AddProjectsController($scope, _close, TbUtils, projects, filterFilter, $rootScope) {
    var vm = this;

    vm.options = {};
    vm.options.startingPage = 0;
    vm.options.pageSize = 15;
    vm.options.count = 0;
    vm.limitInLettersToSearch = 3;
    vm.projects = [];
    vm.totalProjects = [];
    vm.projectsPagination = [];
    vm.projectsSelected = projects.selectedProjectsInSectionForm;
    vm.onPageChange = onPageChange;
    vm.addProject = addProject;
    vm.showSelectedProjects = showSelectedProjects;

    $scope.accept = accept;
    $scope.close = close;
    projects.getProjects(getTotalProjectsSuccess, getTotalProjectsFail);

    function getTotalProjectsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.totalProjects);
        vm.options.count = vm.totalProjects.length;
        projects.getProjectsWithPagination(vm.options.startingPage, vm.options.pageSize, getProjectsSuccess, getProjectsFail, true);
    }

    function getProjectsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.projectsPagination);
        vm.projectsLoading = false;
    }

    function getProjectsFail(response) {
        TbUtils.showErrorMessage(response.data);

        vm.projectsLoading = false;
    }

    function onPageChange(skip, page) {
        if ($scope.search) $scope.search.data = '';
        vm.projects = vm.projectsPagination;
        vm.projects.length = 0;
        vm.projectsLoading = true;
        projects.getProjectsWithPagination(page, skip, getProjectsSuccess, getProjectsFail, true);
    }

    $scope.$watch('search.data', function(term) {
        let obj = {
            Name: term
        };

        if (term && term.length >= vm.limitInLettersToSearch) {
            $scope.filterProjects = filterFilter(vm.totalProjects, obj);
            vm.projects = $scope.filterProjects;
        } else {
            vm.projects = vm.projectsPagination;
        }
    });

    function getTotalProjectsFail(response) {}

    function addProject(prj) {
        vm.projectsSelected.push(prj);
    }

    function showSelectedProjects() {

    }

    function accept() {
        _close(vm.projectsSelected, 500);
    }

    function close() {
        _close({}, 500);
    }
}

module.exports = {
    name: 'AddProjectsController',
    ctrl: AddProjectsController
};