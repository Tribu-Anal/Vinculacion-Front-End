StudentProjectPdfController.$inject = ['hours', 'TbUtils', '$stateParams',
    '$state', '$window'
];

function StudentProjectPdfController(hours, TbUtils, $stateParams,
    $state, $window) {
    var vm = this;
    if (!$stateParams.data)
        $state.go('main.projects');
    else
        init();
    // vm.currentProject = "";
    vm.hoursDescription = {
        totalHours: 0,
        loadingDes: true,
        description: []
    };

    vm.printButton = {
        icon: 'glyphicon-print',
        onClick: printReport,
        show: true
    };

    function printReport() {
        $window.print();
    }

    function init() {
        vm.report = $stateParams.data.reportParams;
        // vm.currentProject = $stateParams.data.reportParams.project;
        hours.getStudentHourReport(vm.report.AccountId, getStudentHourReportSuccess,
            getStudentHourReportFail);
        vm.date = new Date();
    }


    function getStudentHourReportSuccess(response) {
        fillDescriptionsHour(response.data);
    }

    function fillDescriptionsHour(description) {
        console.log(description);
        // let project = getFilterDataByProject(description);
        vm.hoursDescription.totalHours = description.TotalHours;
        vm.hoursDescription.description = description.Projects;
        vm.hoursDescription.loading = false;
    }

    function getStudentHourReportFail() {
        TbUtils.displayNotification('error', 'Error',
            'No se pudo cargar el reporte correctamente.');
        vm.hoursDescription.loading = false;
    }

    function getFilterDataByProject(data) {
        let project = {
            TotalHours: 0,
            Projects: []
        }
        for (let i = 0; i < data.Projects.length; i++) {
            if (data.Projects[i].ProjectName.toUpperCase() === vm.currentProject.toUpperCase()) {
                project.Projects.push(data.Projects[i]);
                project.TotalHours += data.Projects[i].HoursWorked
            }
        }
        return project;
    }
}

module.exports = {
    name: 'StudentProjectPdfController',
    ctrl: StudentProjectPdfController
};