(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('ReportsController', ReportsController);

	ReportsController.$inject = [ '$rootScope', 'TbUtils' ];

	function ReportsController ($rootScope, TbUtils) {
		var vm = this;

		vm.reports = [
			{ title: 'Reporte por Facultad', checked: false },
			{ title: 'Reporte por Periodo', checked: false },
			{ title: 'Reporte de Costos', checked: false },
			{ title: 'Reporte de Beneficiarios', checked: false },
			{ title: 'Reporte de Proyectos por Clase', checked: false },
			{ title: 'Reporte de Proyecto Especial', checked: false },
			{ title: 'Reporte por Carreras', checked: false },
			{ title: 'Reporte de Horas', checked: false },
			{ title: 'Reporte Numero de Alumnos', checked: false }
		];
		vm.generateReports = generateReports;

		function generateReports () {
		}
	}

})();