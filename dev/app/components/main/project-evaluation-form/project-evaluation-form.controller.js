ProjectEvaluationFormController.$inject = ['$rootScope', '$state', '$stateParams', 'projects', 'TbUtils'];

function ProjectEvaluationFormController($rootScope, $state, $stateParams, projects, TBUtils) {
    if ($rootScope.Role !== 'Professor' || !$stateParams.projectId) $state.go('main.projects');

    var vm = this;
    vm.formData = {
        fieldHours: 0,
        calification: 0,
        beneficiariesQuantities: 0,
        beneficiariGroups: ''
    };

    vm.accountId;

    function downloadReport() {
        document.getElementById('my_iframe').src = projects.getProjectReportUrl($state.params.projectId, vm.formData.fieldHours, vm.formData.calification, vm.formData.beneficiariesQuantities, vm.formData.beneficiariGroups);
    }

    vm.downloadReport = downloadReport;
}

module.exports = {
    name: 'ProjectEvaluationFormController',
    ctrl: ProjectEvaluationFormController
};