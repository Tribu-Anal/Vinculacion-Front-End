module.exports = btnClick => {
	const model = {
		headers: ['Numero de Cuenta', 'Nombre', 'Horas Totales', 'Carrera', 'Descargar Finiquito'],
		rows: [
			{ type: 'label', props: { text: obj => obj.AccountId }  },
			{ type: 'label', props: { text: obj => obj.Name }  },
			{ type: 'label', props: { text: obj => obj.Hours }  },
			{ type: 'label', props: { text: obj => obj.Major.Name ? obj.Major.Name : "N/A" }  },
			{ type: 'button', props: { icon: 'glyphicon glyphicon-save-file', 
			                           tooltip: 'Descargar Finiquito', 
			                           onClick: btnClick } 
			}
		]
	};

	return model;
};