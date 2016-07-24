ReportsController.$inject = [ '$rootScope', 'TbUtils', 'reports', '$state' ];

function ReportsController ($rootScope, TbUtils, reports, $state) {
	if ($rootScope.Role !== 'Admin') $state.go('main.projects');

	var vm = this;

	vm.reports = [
		{ title: 'Reporte de Costos', url: 'http://fiasps.unitec.edu:8085/api/Reports/CostsReport/2015' },
		{ title: 'Reporte de Horas de Estudiantes', url: 'http://fiasps.unitec.edu:8085/api/Reports/StudentsReport/2015' }
	];
    vm.selectedReport = 0;
	vm.generateReport = generateReport;

	function generateReport () {            
        window.open(vm.reports[vm.selectedReport].url);
	}

}

module.exports = { name: 'ReportsController', ctrl: ReportsController };