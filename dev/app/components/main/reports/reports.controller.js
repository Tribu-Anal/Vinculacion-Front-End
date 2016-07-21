(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('ReportsController', ReportsController);

	ReportsController.$inject = [ '$rootScope', 'TbUtils', 'reports' ];

	function ReportsController ($rootScope, TbUtils, reports) {
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

})();