AddProjectsController.$inject = ['$scope', 'close', 'TbUtils', 'projects', 'filterFilter'];

function AddProjectsController($scope, _close, TbUtils, projects, filterFilter) {
    var vm = this;

    vm.options = {};
    vm.options.startingPage = 0;
    vm.options.pageSize = 60;
    vm.options.count = 0;
    vm.limitInLettersToSearch = 3;
    vm.projects = [];
    vm.totalProjects = [];
    vm.projectsPagination = [];
    vm.projectsSelected = [];
    vm.onPageChange = onPageChange;
    vm.addProject = addProject;

    $scope.accept = accept;
    $scope.close = close;
    loadParams();
    projects.getProjectsCount(getProjectsCountSuccess);

    function getProjectsCountSuccess(response){
        vm.options.count = response.data;
        projects.getProjectsWithPagination(vm.options.startingPage, vm.options.pageSize , getProjectsSuccess, getProjectsFail);
    }

    function getProjectsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.projectsPagination);
        console.log(vm.projectsPagination);

        vm.projectsLoading = false;
    }
    
    function getProjectsFail(response) {
        TbUtils.showErrorMessage('error', response,
                                 'No se ha podido obtener los proyectos deseados.',
                                 'Error');

        vm.projectsLoading = false;
    }

    function onPageChange(skip, page) {
        if($scope.search) $scope.search.data = '';
        vm.projects = vm.projectsPagination;
        vm.projects.length = 0;
        vm.projectsLoading = true;
        projects.getProjectsWithPagination( page, skip, getProjectsSuccess, getProjectsFail);
    }

    projects.getProjects(getTotalProjectsSuccess, getTotalProjectsFail);

    function getTotalProjectsSuccess(response) {
        console.log(response);
        TbUtils.fillListWithResponseData(response.data, vm.totalProjects);
    }

    $scope.$watch('search.data', function(term) {
        let obj = {Name: term};

        if(term && term.length >= vm.limitInLettersToSearch) {
            $scope.filterProjects = filterFilter(vm.totalProjects, obj);
            vm.projects = $scope.filterProjects;
        }

        else {
            console.log('vacio');
            vm.projects = vm.projectsPagination;
        }
    });

    function getTotalProjectsFail(response) {
        console.log(response);
    }

    function addProject(prj) {
        vm.projectsSelected.push(prj);
        console.log(vm.projectsSelected);
    }

    function loadParams() {
        let params = TbUtils.getModalParams();
        // vm.section.Code = params.Code;
        // vm.section.ClassId = params.ClassId;
        // vm.section.PeriodId = params.PeriodId;
        // vm.section.ProffesorAccountId = params.ProffesorAccountId;
    }

    function accept() {
        // let section = {
        //     Code: vm.section.Code,
        //     ClassId: parseInt(vm.section.ClassId),
        //     PeriodId: parseInt(vm.section.PeriodId),
        //     ProffesorAccountId: vm.section.ProffesorAccountId
        // }
        // _close(section, 500);
    }

    function close() {
        _close({}, 500);
    }
}

module.exports = { name: 'AddProjectsController', ctrl: AddProjectsController };