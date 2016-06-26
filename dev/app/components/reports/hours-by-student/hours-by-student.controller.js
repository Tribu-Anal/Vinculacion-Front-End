(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('HoursByStudentController', HoursByStudentController);

    HoursByStudentController.$inject = ['reports', 'horas', 'TbUtils'];

    function HoursByStudentController(reports, horas, TbUtils) {
        var vm = this;
        vm.report = reports.getReportParams();
        vm.date = new Date();
        vm.completedHours = false;
        vm.hoursDescription = {
            totalHours: 0,
            loadingDes: true,
            description: []
        };
        
        horas.getStudentHourReport(vm.report.AccountId, getStudentHourReportSuccess,
            getStudentHourReportFail);

        function getStudentHourReportSuccess(response) {
            fillDescriptionsHour(response.data);
            vm.completedHours = response.data.TotalHours > 99;
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

        vm.downloadFiniquito = function(){
            document.getElementById('my_iframe').src = horas.getFiniquitoURL(vm.report.AccountId);
        }

        function downloadFiniquitoSuccess(response){
            console.log(response);
        }

        function downloadFiniquitoFail(){
            TbUtils.displayNotification('error', 'Error',
                'No se pudo descargar el finiquito correctamente.');
            vm.hoursDescription.loading = false;
        }
    }
})();
