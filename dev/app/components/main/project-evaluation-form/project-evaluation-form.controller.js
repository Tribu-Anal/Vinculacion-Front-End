ProjectEvaluationFormController.$inject = [ 'TbUtils', 'projects', '$stateParams'];

function ProjectEvaluationFormController(TbUtils, projects, $stateParams) {
    if (!$stateParams.projectId || !$stateParams.sectionId) 
        TbUtils.go('main.professor-dashboard');

    const vm = this;

    vm.formData = {
        fieldHours: 0,
        calification: 0,
        beneficiariesQuantities: 0,
        beneficiaryGroups: ''
    };

    vm.downloadReport = downloadReport;

    function downloadReport() {
        document.getElementById('my_iframe').src = projects.getProjectReportUrl(
            $stateParams.projectId, $stateParams.sectionId,
            vm.formData.fieldHours, vm.formData.calification,
            vm.formData.beneficiariesQuantities,
            vm.formData.beneficiaryGroups);
    }

}

module.exports = { name: 'ProjectEvaluationFormController', ctrl: ProjectEvaluationFormController };