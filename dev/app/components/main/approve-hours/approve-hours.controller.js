ApproveHoursController.$inject = ['hours', 'TbUtils', '$scope'];

function ApproveHoursController(hours, TbUtils, $scope) {
    const vm = this;
    vm.model = undefined;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.getPeriod = getPeriod;
    $scope.placeholder = 'Buscar por código del reporte.';
    $scope.search = searchInfo;
    vm.approveHours = approveHours;

    function getPeriod(period) {
        return period ? period.Number + period.Year : "";
    }

    function getHoursInfoSectionProjects(response) {
        vm.model = response.data;
        if(vm.model.IsApproved)
        	TbUtils.displayNotification('warning', 'Advertencia',
            'Estas horas ya fueron Aprobadas');
    }

    function getHoursInfoSectionProjectsFail() {
        TbUtils.displayNotification('error', 'Error',
            'No se encontró la sección');
    }

    function searchInfo() {
        hours.getHoursInfoSectionProjects($scope.search.data, getHoursInfoSectionProjects,
            getHoursInfoSectionProjectsFail);
    }

    function approveHours() {
        hours.putSectionProjectsApprove(vm.model.Id, putSectionProjectsApproveSuccess,
            putSectionProjectsApproveFail);
    }

    function putSectionProjectsApproveSuccess(){
    	TbUtils.displayNotification('success', 'Exitoso',
            'Horas aprobadas correctamente.');
    	location.reload()
    }

    function putSectionProjectsApproveFail(){
    	TbUtils.displayNotification('error', 'Error',
            'Las horas no pudieron ser aprobadas correctamente.');
    }
}

module.exports = {
    name: 'ApproveHoursController',
    ctrl: ApproveHoursController
};