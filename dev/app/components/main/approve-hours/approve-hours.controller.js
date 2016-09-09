ApproveHoursController.$inject = [ 'TbUtils', 'hours' ];

function ApproveHoursController(TbUtils, hours) {
    const vm = this;

    vm.model = undefined;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.getPeriod = getPeriod;
    vm.approveHours = approveHours;

    vm.placeholder = 'Buscar por código del reporte.';
    vm.search = searchInfo;

    vm.loading = false;

    function getPeriod(period) {
        return period ? period.Number + period.Year : "";
    }

    function searchInfo (term) {
        vm.loading = true;

        hours.getHoursInfoSectionProjects(term, getHoursInfoSectionProjects,
            getHoursInfoSectionProjectsFail, () => { vm.loading = false; });
    }

    function getHoursInfoSectionProjects(response) {
        vm.model = response.data;
        if(vm.model.IsApproved)
        	TbUtils.displayNotification('warning', 'Advertencia',
            'Estas horas ya fueron Aprobadas');
    }

    function getHoursInfoSectionProjectsFail(response) {
        TbUtils.showErrorMessage(response.data);
    }

    function approveHours() {
        vm.loading = true;
        hours.putSectionProjectsApprove(vm.model.Id, putSectionProjectsApproveSuccess,
            putSectionProjectsApproveFail, () => { vm.loading = false; });
    }

    function putSectionProjectsApproveSuccess(){
    	TbUtils.displayNotification('success', 'Exitoso',
            'Horas aprobadas correctamente.');
    	TbUtils.reload()
    }

    function putSectionProjectsApproveFail(resp){
    	TbUtils.showErrorMessage(resp.data);
    }
}

module.exports = {
    name: 'ApproveHoursController',
    ctrl: ApproveHoursController
};