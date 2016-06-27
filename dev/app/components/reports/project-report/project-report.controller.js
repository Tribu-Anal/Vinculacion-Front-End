(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectReportFormController', ProjectReportFormController);

    ProjectReportFormController.$inject = ['$rootScope', '$state', '$stateParams', 'projects', 'TbUtils'];

    function ProjectReportFormController($rootScope, $state, $stateParams, projects, TBUtils) {
        if ($rootScope.Role !== 'Professor'  || !$stateParams.projectId) $state.go('dashboard.home');

        var vm = this;
        vm.formData = {
            fieldHours: 0,
            calification: 0,
            beneficiariesQuantities: 0,
            beneficiariGroups: ''
        };
        
        vm.accountId;
        
        function downloadReport() {
            console.log("onoid");
            document.getElementById('my_iframe').src = projects.getProjectReportUrl($state.params.projectId, vm.formData.fieldHours, vm.formData.calification, vm.formData.beneficiariesQuantities, vm.formData.beneficiariGroups);
        }
        
        vm.downloadReport = downloadReport;
    }
})();