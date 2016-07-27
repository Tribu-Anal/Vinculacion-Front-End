const reportsUrl = 'http://fiasps.unitec.edu:8085/api/Reports',
      yearParamName = 'Año del Reporte',
      yearPlaceholder = '2016',
      classIdParamName = 'Codigo de la Seccion',
      classIdPlaceholder = 'Ingrese el codigo';

module.exports = [
	{ 
		title: 'Reporte de Costos', 
		url: `${reportsUrl}/CostsReport`,
		hasParam: true,
		paramName: yearParamName,
		placeholder: yearPlaceholder
	},
	{ 
		title: 'Reporte de Horas de Estudiantes', 
	  	url: `${reportsUrl}/StudentsReport`,
		hasParam: true,
		paramName: yearParamName,
		placeholder: yearPlaceholder
	}
];