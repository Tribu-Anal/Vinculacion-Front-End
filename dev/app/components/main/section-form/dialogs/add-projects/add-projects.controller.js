AddProjectsController.$inject = ['$scope', 'close', 'sections', 'sectionData', 'TbUtils'];

function AddProjectsController($scope, _close, sections, sectionData, TbUtils) {
    var vm = this;
    vm.professors = [];
    vm.classes = [];
    vm.periods = [];
    vm.section = {
        Code: '',
        ClassId: '',
        PeriodId: '',
        ProffesorAccountId: ''
    };
    $scope.accept = accept;
    $scope.close = close;
    getClasses();
    getProfessors();
    getPeriods();
    loadParams();

    function loadParams() {
        let params = TbUtils.getModalParams();
        vm.section.Code = params.Code;
        vm.section.ClassId = params.ClassId;
        vm.section.PeriodId = params.PeriodId;
        vm.section.ProffesorAccountId = params.ProffesorAccountId;
    }

    function accept() {
        let section = {
            Code: vm.section.Code,
            ClassId: parseInt(vm.section.ClassId),
            PeriodId: parseInt(vm.section.PeriodId),
            ProffesorAccountId: vm.section.ProffesorAccountId
        }
        _close(section, 500);
    }

    function close() {
        _close({}, 500);
    }

    function getClasses() {
        sectionData.getClasses(getClassesSuccess, getClassesFailure);
    }

    function getClassesSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.classes);
    }

    function getClassesFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las clases.');
    }

    function getProfessors() {
        sectionData.getProfessors(getProfessorsSuccess, getProfessorsFailure);
    }

    function getProfessorsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.professors);
    }

    function getProfessorsFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los profesores.');
    }

    function getPeriods() {
        sectionData.getPeriods(getPeriodsSuccess, getPeriodsFailure);
    }

    function getPeriodsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.periods);
    }

    function getPeriodsFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los periodos.');
    }

}

module.exports = { name: 'AddProjectsController', ctrl: AddProjectsController };