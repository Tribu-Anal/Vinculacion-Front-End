StudentProjectPdfController.$inject = ['reports', 'horas', 'TbUtils'];

function StudentProjectPdfController (reports, horas, TbUtils) {
    var vm = this;
    vm.report = reports.getReportParams();
    vm.date = new Date();
    vm.hoursDescription = {
        totalHours: 0,
        loadingDes: true,
        description: []
    };
    
    horas.getStudentHourReport(vm.report.AccountId, getStudentHourReportSuccess,
        getStudentHourReportFail);

    function getStudentHourReportSuccess(response) {
        fillDescriptionsHour(response.data);
    }

    function fillDescriptionsHour(description) {
        vm.hoursDescription.totalHours = description.TotalHours;
        vm.hoursDescription.description = description.Projects;
        vm.hoursDescription.loading = false;
    }

    function getStudentHourReportFail() {
        TbUtils.displayNotification('error', 'Error',
            'No se pudo cargar el reporte correctamente.');
        vm.hoursDescription.loading = false;
    }
}

module.exports = { name: 'StudentProjectPdfController', ctrl: StudentProjectPdfController };
